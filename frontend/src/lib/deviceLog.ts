import { useSyncExternalStore } from "react";
import { App } from "@capacitor/app";
import { apiOrigin, isNative } from "./server";

/**
 * Problems are recorded on the device even when the server cannot be reached,
 * then uploaded to the server's log folder once it can, and removed from the
 * device after the server stores them. The newest MAX_ENTRIES are kept.
 */
export type LogLevel = "info" | "warn" | "error";
type Entry = { seq: number; time: string; level: LogLevel; event: string; profile?: string; count?: number; last?: string; [key: string]: unknown };

const STORAGE_KEY = "grocerypro.deviceLog";
const DEVICE_KEY = "grocerypro.deviceId";
const MAX_ENTRIES = 500;
const UPLOAD_BATCH = 200;

function readEntries(): Entry[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    return Array.isArray(parsed) ? parsed as Entry[] : [];
  } catch { return []; }
}

let entries = readEntries();
let seq = entries.reduce((max, entry) => Math.max(max, entry.seq || 0), 0);
let profile: string | undefined;
const listeners = new Set<() => void>();

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }
  catch { entries = entries.slice(-Math.floor(MAX_ENTRIES / 2)); }
  listeners.forEach(listener => listener());
}

export function deviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

/** The chosen profile is recorded with each entry so logs show whose phone it is. */
export function setLogProfile(name: string | null | undefined) { profile = name ?? undefined; }

const sameKind = (a: Entry, b: Omit<Entry, "seq" | "time">) =>
  a.level === b.level && a.event === b.event && a.profile === b.profile &&
  ["path", "status", "problem", "message", "state"].every(key => a[key] === b[key]);

/**
 * Adds an entry. A repeat of one of the last few entries (the same request
 * failing every few seconds during an outage) updates its count instead, so
 * the start of an outage is not pushed out of the log.
 */
export function logEvent(level: LogLevel, event: string, details: Record<string, unknown> = {}) {
  const time = new Date().toISOString();
  const next = { level, event, ...(profile ? { profile } : {}), ...details };
  const repeat = entries.slice(-6).reverse().find(entry => sameKind(entry, next));
  if (repeat) {
    entries = entries.filter(entry => entry !== repeat);
    entries.push({ ...repeat, seq: ++seq, count: (repeat.count ?? 1) + 1, last: time });
  }
  else entries = [...entries, { seq: ++seq, time, ...next }].slice(-MAX_ENTRIES);
  save();
}

export const pendingLogCount = () => entries.length;
export function usePendingLogCount() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, pendingLogCount);
}

let appVersion: Promise<string> | null = null;
const version = () => appVersion ??= isNative ? App.getInfo().then(info => `${info.version} (${info.build})`).catch(() => "unknown") : Promise.resolve("web");

let uploading: Promise<boolean> | null = null;

/** Sends queued entries to the server and removes the ones it stored. Never throws. */
export function uploadLogs(): Promise<boolean> {
  if (uploading) return uploading;
  if (!entries.length) return Promise.resolve(true);
  uploading = (async () => {
    try {
      while (entries.length) {
        const batch = entries.slice(0, UPLOAD_BATCH).map(entry => ({ ...entry }));
        const lastSeq = batch[batch.length - 1].seq;
        // fetch directly: api requests would refresh every open screen after a POST.
        const response = await fetch(apiOrigin() + "/v1/client-logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ device: deviceId(), app: await version(), platform: isNative ? "android" : "web", userAgent: navigator.userAgent, entries: batch }),
          signal: timeoutSignal(15000),
          cache: "no-store",
        });
        if (!response.ok) return false;
        const ack = await response.json() as { stored?: number };
        if (ack.stored !== batch.length) return false;
        entries = entries.filter(entry => entry.seq > lastSeq);
        save();
      }
      return true;
    } catch {
      return false;
    } finally {
      uploading = null;
    }
  })();
  return uploading;
}

/** AbortSignal.timeout is missing from older Android WebViews. */
export function timeoutSignal(ms: number) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

let started = false;
/** Records uncaught errors. */
export function startDeviceLog() {
  if (started) return;
  started = true;
  window.addEventListener("error", event => logEvent("error", "script-error", { message: event.message, source: `${event.filename}:${event.lineno}` }));
  window.addEventListener("unhandledrejection", event => logEvent("error", "unhandled-rejection", { message: String((event.reason as Error)?.message ?? event.reason) }));
}
