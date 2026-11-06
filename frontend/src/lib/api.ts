import { apiOrigin, describeServer, getServer } from "./server";
import { screenDataCache, type LoadPriority } from "./priorityDataCache";
import { shoppingListCacheKey, writeShoppingListCache } from "./shoppingListCache";
import { connectionProblemMessage, reportRequest } from "./connection";
import { logEvent } from "./deviceLog";
import { readProfile } from "./profile";

export class ApiError extends Error {
  constructor(message: string, readonly status?: number, readonly network = false) { super(message); }
}

const TIMEOUT_MS = 15000;
const UPLOAD_TIMEOUT_MS = 60000;

// Saves run in the background, so reads wait for them rather than returning data from before the save.
const pendingWrites = new Set<Promise<unknown>>();

function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal, origin = apiOrigin(), priority: RequestPriority = "auto"): Promise<T> {
  if (method === "GET") {
    return pendingWrites.size ? Promise.allSettled([...pendingWrites]).then(() => send<T>(method, path, body, signal, origin, priority)) : send<T>(method, path, body, signal, origin, priority);
  }
  const write = send<T>(method, path, body, signal, origin, priority);
  const done = () => { pendingWrites.delete(write); };
  pendingWrites.add(write);
  write.then(done, done);
  return write;
}

async function send<T>(method: string, path: string, body?: unknown, signal?: AbortSignal, origin = apiOrigin(), priority: RequestPriority = "auto"): Promise<T> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort);
  if (signal?.aborted) abort();
  const upload = body instanceof Blob;
  // Writes only: a custom header on reads would add a CORS preflight to every GET.
  const profileId = method === "GET" ? undefined : readProfile()?.user_id;
  const timer = setTimeout(abort, upload ? UPLOAD_TIMEOUT_MS : TIMEOUT_MS);
  const started = performance.now();
  const ms = () => Math.round(performance.now() - started);
  let response: Response;
  let text: string;
  try {
    response = await fetch(origin + "/v1" + path, {
      method,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": upload ? body.type : "application/json" }),
        // Identifies the acting profile for admin-only changes.
        ...(profileId ? { "X-Profile-Id": String(profileId) } : {}),
      },
      body: body === undefined ? undefined : upload ? body : JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
      priority,
    });
    text = await response.text();
  } catch (error) {
    if (signal?.aborted) throw error;
    const timedOut = controller.signal.aborted;
    logEvent(method === "GET" ? "warn" : "error", "request-failed", { method, path, ms: ms(), message: timedOut ? "timed out" : "no response" });
    reportRequest(false, false);
    throw new ApiError("Could not connect. Please try again.", undefined, true);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }

  let data: unknown = undefined;
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }
  if (!response.ok) {
    const message = data && typeof data === "object" && typeof (data as { error?: unknown }).error === "string"
      ? (data as { error: string }).error
      : "The server could not complete the request.";
    logEvent(response.status >= 500 || method !== "GET" ? "error" : "warn", "request-failed", { method, path, status: response.status, ms: ms(), message });
    reportRequest(false, true, response.status);
    throw new ApiError(message, response.status);
  }
  reportRequest(true, true, response.status);
  if (method !== "GET") screenDataCache.invalidate();
  return data as T;
}

const dataKey = (path: string) => JSON.stringify([apiOrigin() || window.location.origin, path]);
export const peekScreenData = <T>(path: string) => screenDataCache.peek<T>(dataKey(path));
export function loadScreenData<T>(path: string, priority: LoadPriority = "navigation", fresh = false): Promise<T> {
  const origin = apiOrigin();
  const key = dataKey(path);
  return screenDataCache.read<T>(key, priority, selectedPriority =>
    request<T>("GET", path, undefined, undefined, origin, selectedPriority === "viewport" ? "low" : "high"), fresh).then(response => {
    // A mutation or reconnect may have invalidated this request while it ran.
    if (screenDataCache.peek<T>(key) === response) {
      writeShoppingListCache(shoppingListCacheKey(origin || window.location.origin, path), response);
    }
    return response;
  });
}

export const api = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>("GET", path, undefined, signal),
  post: <T = unknown>(path: string, body: unknown) => request<T>("POST", path, body),
  patch: <T = unknown>(path: string, body: unknown) => request<T>("PATCH", path, body),
  put: <T = unknown>(path: string, body: unknown) => request<T>("PUT", path, body),
  /** Sends a file as the raw request body with its own content type. */
  upload: <T = unknown>(path: string, file: Blob) => request<T>("PUT", path, file),
  delete: <T = unknown>(path: string) => request<T>("DELETE", path),
};

export function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.network || error.status === 503) {
      const diagnosis = connectionProblemMessage();
      if (diagnosis) return diagnosis;
      if (!error.network) return error.message;
      const server = getServer();
      return server ? `Could not reach ${describeServer(server)}. Check your connection or change the server.` : error.message;
    }
    return error.message;
  }
  return "Something went wrong. Please try again.";
}

/** Checks whether a Grocery Pro backend answers at an origin ("" = same origin). */
export async function checkServer(origin: string): Promise<{ ok: boolean; message: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(origin + "/health", { signal: controller.signal, cache: "no-store" });
    const data = await response.json().catch(() => null) as { app?: string } | null;
    if (response.ok && data?.app === "grocerypro") return { ok: true, message: "Connected" };
    if (data?.app === "grocerypro" && response.status === 503) return { ok: false, message: "Server is up but its database is not ready" };
    if (data?.app === "grocerypro") return { ok: false, message: "The server answered with an error" };
    return { ok: false, message: "Not a Grocery Pro server" };
  } catch {
    return { ok: false, message: controller.signal.aborted ? "Timed out" : "Unreachable" };
  } finally {
    clearTimeout(timer);
  }
}
