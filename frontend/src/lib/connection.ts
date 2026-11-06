import { useSyncExternalStore } from "react";
import { Capacitor, registerPlugin, type PluginListenerHandle } from "@capacitor/core";
import { apiOrigin, describeServer, getServer, isNative } from "./server";
import { appActive, onAppStateChange } from "./appState";
import { screenDataCache } from "./priorityDataCache";
import { logEvent, timeoutSignal, uploadLogs } from "./deviceLog";

/**
 * Works out why the server cannot be reached, step by step: the phone's
 * internet, Tailscale, the Grocery Pro server, then its database. Problems
 * are re-checked every few seconds until the server answers again.
 */
type DeviceNetwork = { online: boolean; validated?: boolean; vpn: boolean | null; tailscaleIp: string | null; tailscaleInstalled: boolean | null };
type NetworkStatusPlugin = {
  getStatus(): Promise<DeviceNetwork>;
  openTailscale(): Promise<void>;
  addListener(event: "change", listener: () => void): Promise<PluginListenerHandle>;
};
const NetworkStatus = registerPlugin<NetworkStatusPlugin>("NetworkStatus");
const nativeNetwork = isNative && Capacitor.isPluginAvailable("NetworkStatus");

export type Problem = "offline" | "tailscale-missing" | "tailscale-off" | "other-vpn" | "server-unreachable" | "wrong-server" | "database-down" | "server-error";
export type Step = boolean | null; // null = not checked
export type ConnectionState = {
  phase: "unknown" | "ok" | "problem";
  checking: boolean;
  problem: Problem | null;
  steps: { internet: Step; tailscale: Step; server: Step; database: Step };
  network: DeviceNetwork | null;
  tailscaleRequired: boolean;
  status?: number;
  checkedAt: number | null;
  lastOk: number | null;
};

const LAST_OK_KEY = "grocerypro.lastConnected";
const RETRY_MS = 5000;
const HEALTH_TIMEOUT_MS = 6000;

let state: ConnectionState = {
  phase: "unknown", checking: false, problem: null, steps: { internet: null, tailscale: null, server: null, database: null },
  network: null, tailscaleRequired: false, checkedAt: null, lastOk: Number(localStorage.getItem(LAST_OK_KEY)) || null,
};
const listeners = new Set<() => void>();
function setState(next: ConnectionState) {
  state = next;
  listeners.forEach(listener => listener());
}
export const connectionState = () => state;
export function useConnection() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, connectionState);
}

/** Tailscale addresses (100.64.0.0/10) and MagicDNS names only work with Tailscale on. */
export function needsTailscale(origin = apiOrigin()) {
  try {
    const host = new URL(origin || window.location.origin).hostname;
    const parts = host.split(".").map(Number);
    return host.endsWith(".ts.net") || (parts.length === 4 && parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127);
  } catch { return false; }
}

async function deviceNetwork(): Promise<DeviceNetwork> {
  if (nativeNetwork) {
    try { return await NetworkStatus.getStatus(); } catch { /* Fall back to the browser's view. */ }
  }
  return { online: navigator.onLine, vpn: null, tailscaleIp: null, tailscaleInstalled: null };
}

type Health = { reached: true; status: number; app: boolean; database: boolean } | { reached: false };
async function health(origin: string): Promise<Health> {
  try {
    const response = await fetch(origin + "/health", { cache: "no-store", signal: timeoutSignal(HEALTH_TIMEOUT_MS) });
    const data = await response.json().catch(() => null) as { app?: string; status?: string } | null;
    return { reached: true, status: response.status, app: data?.app === "grocerypro", database: response.ok && data?.status === "ok" };
  } catch {
    return { reached: false };
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function diagnose(): Promise<Omit<ConnectionState, "checking">> {
  const origin = apiOrigin();
  const tailscaleRequired = needsTailscale(origin);
  let result = await health(origin);
  // One retry: a phone waking up or switching networks often fails the first request.
  if (!result.reached || !result.database) { await sleep(1500); result = await health(origin); }
  const network = await deviceNetwork();
  const base = { network, tailscaleRequired, checkedAt: Date.now(), lastOk: state.lastOk };
  const tailscaleUp = network.tailscaleIp ? true : network.vpn === false ? false : null;
  if (result.reached && result.app && result.database) {
    return { ...base, phase: "ok", problem: null, lastOk: Date.now(), steps: { internet: true, tailscale: tailscaleRequired ? true : null, server: true, database: true } };
  }
  if (result.reached) {
    const steps = { internet: true, tailscale: tailscaleRequired ? true : null, server: result.app, database: result.app && result.status === 503 ? false : null };
    const problem: Problem = !result.app ? "wrong-server" : result.status === 503 ? "database-down" : "server-error";
    return { ...base, phase: "problem", problem, status: result.status, steps };
  }
  const steps: ConnectionState["steps"] = { internet: network.online, tailscale: tailscaleRequired ? tailscaleUp : null, server: false, database: null };
  let problem: Problem = "server-unreachable";
  if (!network.online) { problem = "offline"; steps.server = null; }
  else if (tailscaleRequired && network.tailscaleInstalled === false) problem = "tailscale-missing";
  else if (tailscaleRequired && network.vpn === false) problem = "tailscale-off";
  else if (tailscaleRequired && network.vpn && !network.tailscaleIp) problem = "other-vpn";
  if (problem !== "server-unreachable") steps.server = null;
  return { ...base, phase: "problem", problem, steps };
}

let running: Promise<void> | null = null;
let again = false;

/** Runs a check now (or right after the current one) and updates the state. */
export function checkConnection(): Promise<void> {
  if (running) { again = true; return running; }
  running = (async () => {
    do {
      again = false;
      const before = state;
      setState({ ...before, checking: true });
      const origin = apiOrigin();
      const diagnosis = await diagnose();
      if (origin !== apiOrigin()) { again = true; continue; }
      const next = { ...diagnosis, checking: again };
      setState(next);
      record(before, next);
    } while (again);
  })().finally(() => { running = null; schedule(); });
  return running;
}

function record(before: ConnectionState, next: ConnectionState) {
  if (next.phase === "ok") {
    try { localStorage.setItem(LAST_OK_KEY, String(next.lastOk)); } catch { /* Monitoring still works without storage. */ }
  }
  const changed = before.phase !== next.phase || before.problem !== next.problem;
  if (!changed) return;
  const { network } = next;
  logEvent(next.phase === "ok" ? "info" : "warn", "connection", {
    state: next.phase, problem: next.problem ?? undefined, status: next.status,
    server: getServer() ? describeServer(getServer()!) : undefined,
    internet: network?.online, validated: network?.validated, vpn: network?.vpn, tailscaleIp: network?.tailscaleIp, tailscaleInstalled: network?.tailscaleInstalled,
    downSince: next.phase === "ok" && before.phase === "problem" && before.checkedAt ? new Date(before.checkedAt).toISOString() : undefined,
  });
  if (next.phase === "ok" && before.phase === "problem") {
    // Back online: reload every open screen and send what was logged while offline.
    screenDataCache.invalidate();
    recoveryListeners.forEach(listener => listener());
  }
  if (next.phase === "ok") void uploadLogs();
}

const recoveryListeners = new Set<() => void>();
/** Called when the server answers again after a problem. */
export function onConnectionRecovered(listener: () => void) {
  recoveryListeners.add(listener);
  return () => { recoveryListeners.delete(listener); };
}

let retryTimer: ReturnType<typeof setTimeout> | undefined;
let soonTimer: ReturnType<typeof setTimeout> | undefined;
function schedule() {
  clearTimeout(retryTimer);
  if (state.phase === "problem" && appActive()) retryTimer = setTimeout(() => void checkConnection(), RETRY_MS);
}
/** Checks shortly, merging bursts of failures and network events into one check. */
function checkSoon(delay = 300) {
  clearTimeout(soonTimer);
  soonTimer = setTimeout(() => void checkConnection(), delay);
}

/** API requests report how they went: failures start a check, successes clear a problem. */
export function reportRequest(ok: boolean, reachedServer: boolean, status?: number) {
  if (ok) {
    if (state.phase === "problem" && !running) checkSoon(0);
    return;
  }
  if (!reachedServer || status === 503 || status === 502 || status === 504) checkSoon();
}

/** Live-update socket errors usually mean the same thing as failed requests. */
export const reportSocketError = () => { if (state.phase !== "problem") checkSoon(1000); };

export const openTailscale = () => nativeNetwork ? NetworkStatus.openTailscale().catch(() => {}) : Promise.resolve();
export const canOpenTailscale = nativeNetwork;

let stop: (() => void) | null = null;
/** Starts watching: checks now, on resume, on network changes and while a problem lasts. */
export function startConnectionMonitor() {
  if (stop) return stop;
  const online = () => checkSoon(500);
  window.addEventListener("online", online);
  window.addEventListener("offline", online);
  const stopAppState = onAppStateChange(active => {
    if (active) checkSoon(0);
    else { clearTimeout(retryTimer); clearTimeout(soonTimer); }
  });
  let native: PluginListenerHandle | null = null;
  let disposed = false;
  if (nativeNetwork) {
    // Network callbacks arrive in bursts (and for signal changes); wait for them to settle.
    void NetworkStatus.addListener("change", () => checkSoon(1500)).then(handle => { if (disposed) void handle.remove(); else native = handle; }).catch(error => logEvent("warn", "network-monitor-failed", { message: String(error) }));
  }
  const uploads = setInterval(() => { if (state.phase === "ok" && appActive()) void uploadLogs(); }, 60000);
  void checkConnection();
  stop = () => {
    disposed = true;
    window.removeEventListener("online", online);
    window.removeEventListener("offline", online);
    stopAppState();
    void native?.remove();
    clearInterval(uploads);
    clearTimeout(retryTimer);
    clearTimeout(soonTimer);
    stop = null;
  };
  return stop;
}

/** Plain-language title, instruction and main action for a problem. */
export function describeProblem(problem: Problem, status?: number): { title: string; text: string } {
  switch (problem) {
    case "offline": return { title: "No internet", text: "Turn on Wi-Fi or mobile data." };
    case "tailscale-missing": return { title: "Tailscale is not installed", text: "Install Tailscale and sign in to reach Grocery Pro." };
    case "tailscale-off": return { title: "Tailscale is off", text: "Open Tailscale and turn it on." };
    case "other-vpn": return { title: "Another VPN is on", text: "Turn off the other VPN, then turn on Tailscale." };
    case "server-unreachable": return nativeNetwork && needsTailscale()
      ? { title: "Grocery Pro computer is not responding", text: "Tailscale is on. The computer may be off, asleep or signed out of Tailscale." }
      : { title: "Grocery Pro server is not responding", text: needsTailscale() ? "Check that Tailscale is on, then try again. The computer may be off or asleep." : "The server may be off, or the address may be wrong." };
    case "wrong-server": return { title: "Wrong server address", text: `This address is not a Grocery Pro server${status ? ` (HTTP ${status})` : ""}. Change the server.` };
    case "database-down": return { title: "Server database is not responding", text: "The server is on but cannot read the list. It retries on its own." };
    case "server-error": return { title: "Server error", text: `The server answered with an error${status ? ` (HTTP ${status})` : ""}.` };
  }
}

/** One-line reason for a failed request, when a check has found one. */
export function connectionProblemMessage(): string | null {
  if (state.phase !== "problem" || !state.problem) return null;
  const { title, text } = describeProblem(state.problem, state.status);
  return `${title}. ${text}`;
}

let checkOpen = false;
const checkListeners = new Set<() => void>();
export function setConnectionCheckOpen(open: boolean) {
  checkOpen = open;
  checkListeners.forEach(listener => listener());
}
export function useConnectionCheckOpen() {
  return useSyncExternalStore(listener => { checkListeners.add(listener); return () => { checkListeners.delete(listener); }; }, () => checkOpen);
}
