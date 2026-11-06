import { useSyncExternalStore } from "react";
import { Capacitor } from "@capacitor/core";

/** True inside the Android (Capacitor) app, false in a browser. */
export const isNative = Capacitor.isNativePlatform();

const env = import.meta.env;
const API_PORT = env.VITE_API_PORT || "3033";
/** This PC's Tailscale address, from VITE_TAILSCALE_HOST in frontend/.env. Empty hides the preset. */
export const TAILSCALE_URL = env.VITE_TAILSCALE_URL || (env.VITE_TAILSCALE_HOST ? `http://${env.VITE_TAILSCALE_HOST}:${API_PORT}` : "");
/**
 * The backend on this PC without Tailscale. Android emulators reach the host
 * PC's loopback through 10.0.2.2; browsers on the PC use localhost.
 */
export const LOCAL_URL = env.VITE_LOCAL_URL || (isNative ? `http://10.0.2.2:${API_PORT}` : `http://localhost:${API_PORT}`);

export type ServerMode = "site" | "tailscale" | "local" | "custom";
export type ServerChoice = { mode: ServerMode; custom?: string };
export type ServerOption = { mode: ServerMode; label: string; description: string; url: string };

const STORAGE_KEY = "grocerypro.server";
const MODES: ServerMode[] = ["site", "tailscale", "local", "custom"];

/** Accepts "100.1.2.3:3033", "http://host:3033/", "http://host/v1" and returns an origin. */
export function normalizeServerUrl(input: string): string | null {
  let text = input.trim();
  if (!text) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) text = "http://" + text;
  try {
    const url = new URL(text);
    if ((url.protocol !== "http:" && url.protocol !== "https:") || !url.hostname) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function serverOptions(): ServerOption[] {
  const options: ServerOption[] = [];
  if (!isNative) options.push({ mode: "site", label: "This website", description: "The server this page was opened from.", url: window.location.origin });
  if (TAILSCALE_URL) options.push({ mode: "tailscale", label: "Tailscale", description: "The Grocery Pro PC over Tailscale. This device must be connected to the tailnet.", url: TAILSCALE_URL });
  options.push(
    {
      mode: "local", label: "Local",
      description: isNative ? "The PC running this emulator, through 10.0.2.2. No Tailscale needed." : "The backend on this computer.",
      url: LOCAL_URL,
    },
    { mode: "custom", label: "Custom address", description: "Any other Grocery Pro server address.", url: "" },
  );
  return options;
}

/** The origin requests go to. An empty string means same-origin (web only). */
export function originFor(choice: ServerChoice): string {
  switch (choice.mode) {
    case "site": return "";
    case "tailscale": return TAILSCALE_URL;
    case "local": return LOCAL_URL;
    case "custom": return normalizeServerUrl(choice.custom ?? "") ?? "";
  }
}

export function describeServer(choice: ServerChoice): string {
  const option = serverOptions().find(o => o.mode === choice.mode);
  const url = choice.mode === "site" ? window.location.origin : originFor(choice);
  return `${option?.label ?? "Server"} (${url})`;
}

function readStored(): ServerChoice | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as ServerChoice | null;
    if (!parsed || !MODES.includes(parsed.mode)) return null;
    if (parsed.mode === "site" && isNative) return null;
    if (parsed.mode === "tailscale" && !TAILSCALE_URL) return null;
    if (parsed.mode === "custom" && !normalizeServerUrl(parsed.custom ?? "")) return null;
    return parsed;
  } catch {
    return null;
  }
}

// The web build defaults to the server that served it. The Android app starts
// unset and picks the first preset that answers (see App), asking only if none do.
let current: ServerChoice | null = readStored() ?? (isNative ? null : { mode: "site" });
const listeners = new Set<() => void>();

export function getServer() { return current; }
export function apiOrigin() { return current ? originFor(current) : ""; }

export function setServer(choice: ServerChoice) {
  const saved: ServerChoice = choice.mode === "custom"
    ? { mode: "custom", custom: normalizeServerUrl(choice.custom ?? "") ?? "" }
    : { mode: choice.mode };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  current = saved;
  listeners.forEach(listener => listener());
}

export function useServer() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, getServer);
}
