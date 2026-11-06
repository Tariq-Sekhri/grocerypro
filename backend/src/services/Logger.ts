import fs from "node:fs";
import path from "node:path";
import type { RequestHandler } from "express";
import { monitorEventLoopDelay } from "node:perf_hooks";

/**
 * JSON-lines logs in backend/logs (LOG_DIR overrides), one file per kind and
 * day: server-YYYY-MM-DD.log for this process, client-YYYY-MM-DD.log for logs
 * uploaded by devices. Files older than KEEP_DAYS are deleted.
 */
export const logRoot = path.resolve(process.env.LOG_DIR || path.join(process.cwd(), "logs"));
const KEEP_DAYS = 30;
const SLOW_MS = 3000;

type Level = "info" | "warn" | "error";
const day = (time = new Date()) => time.toISOString().slice(0, 10);

function write(kind: "server" | "client", entries: object[], required = false) {
  if (!entries.length) return;
  try {
    fs.mkdirSync(logRoot, { recursive: true });
    fs.appendFileSync(path.join(logRoot, `${kind}-${day()}.log`), entries.map(entry => JSON.stringify(entry)).join("\n") + "\n");
  } catch (error) {
    console.error("Could not write log:", error);
    if (required) throw error;
  }
}

export function log(level: Level, event: string, details: Record<string, unknown> = {}) {
  const entry = { time: new Date().toISOString(), level, event, ...details };
  write("server", [entry]);
  (level === "error" ? console.error : level === "warn" ? console.warn : console.log)(`[${level}] ${event}`, Object.keys(details).length ? JSON.stringify(details) : "");
}

export const errorDetails = (error: unknown) => error instanceof Error
  ? { error: error.message, code: (error as { code?: unknown }).code, stack: error.stack?.split("\n").slice(0, 6).join("\n") }
  : { error: String(error) };

export const clientAddress = (address: string | undefined) => (address ?? "").replace(/^::ffff:/, "");

/** Records writes, failures and slow requests with the client address. Plain fast reads are not logged. */
export const requestLogger: RequestHandler = (req, res, next) => {
  const started = performance.now();
  res.once("finish", () => {
    const ms = Math.round(performance.now() - started);
    const failed = res.statusCode >= 400;
    if (req.method === "GET" && !failed && ms < SLOW_MS) return;
    if (req.path === "/v1/client-logs" && !failed) return;
    log(res.statusCode >= 500 ? "error" : failed || ms >= SLOW_MS ? "warn" : "info", "request", {
      method: req.method, path: req.originalUrl, status: res.statusCode, ms, ip: clientAddress(req.socket.remoteAddress),
    });
  });
  next();
};

const deviceEntry = (value: unknown) => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
const MAX_ENTRY_CHARS = 4000;

/** Stores a device's queued log entries. Returns how many were kept. */
export function writeClientLogs(body: unknown, ip: string): number {
  const batch = deviceEntry(body);
  const entries = Array.isArray(batch?.entries) ? batch.entries.slice(0, 1000) : [];
  const device = { device: String(batch?.device ?? "unknown").slice(0, 64), app: String(batch?.app ?? "").slice(0, 32), platform: String(batch?.platform ?? "").slice(0, 32), userAgent: String(batch?.userAgent ?? "").slice(0, 200), ip };
  const received = new Date().toISOString();
  const lines = entries.map(deviceEntry).filter((entry): entry is Record<string, unknown> => !!entry).map(entry => {
    const line = { ...entry, ...device, received };
    return JSON.stringify(line).length > MAX_ENTRY_CHARS ? { time: entry.time, level: entry.level, event: entry.event, ...device, received, truncated: true } : line;
  });
  write("client", lines, true);
  return lines.length;
}

/** Deletes log files older than KEEP_DAYS. */
export function pruneLogs() {
  const cutoff = day(new Date(Date.now() - KEEP_DAYS * 86400000));
  try {
    for (const name of fs.readdirSync(logRoot)) {
      const match = /^(server|client)-(\d{4}-\d{2}-\d{2})\.log$/.exec(name);
      if (match && match[2] < cutoff) fs.rmSync(path.join(logRoot, name), { force: true });
    }
  } catch { /* No log folder yet. */ }
}

/** Warns when the process stalls, which makes every request (and /health) time out. */
export function watchEventLoop() {
  const histogram = monitorEventLoopDelay({ resolution: 50 });
  histogram.enable();
  const timer = setInterval(() => {
    const maxMs = Math.round(histogram.max / 1e6);
    if (maxMs >= 1000) log("warn", "event-loop-stall", { maxMs, memoryMb: Math.round(process.memoryUsage().rss / 1048576) });
    histogram.reset();
  }, 30000);
  timer.unref();
}
