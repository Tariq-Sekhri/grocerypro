import { useEffect, useSyncExternalStore } from "react";
import { api } from "./api";
import { apiOrigin } from "./server";
import { subscribeToLiveUpdates } from "./liveUpdates";

/**
 * Item images are downloaded once and kept on the device in IndexedDB, keyed by
 * server and path. Paths change whenever an image does, so a stored copy never
 * goes stale; sync downloads new paths and drops ones no item uses any more.
 */
type Stored = { key: string; origin: string; blob: Blob };
type Manifest = { item_id: number; image_path: string }[];

const urls = new Map<string, string>();
const loads = new Map<string, Promise<void>>();
const downloads = new Map<string, Promise<Blob | null>>();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(listener => listener());
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const serverBase = () => apiOrigin() || window.location.origin;

let database: Promise<IDBDatabase | null> | null = null;
function openDatabase() {
  database ??= new Promise(resolve => {
    if (typeof indexedDB === "undefined") { resolve(null); return; }
    const request = indexedDB.open("grocerypro-images", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("images", { keyPath: "key" }).createIndex("origin", "origin");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
  return database;
}

/** Runs one request against the image store; storage failures read as empty. */
async function storeRequest<T>(mode: IDBTransactionMode, start: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | undefined> {
  const db = await openDatabase();
  if (!db) return undefined;
  return new Promise(resolve => {
    try {
      const request = start(db.transaction("images", mode).objectStore("images"));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(undefined);
    } catch { resolve(undefined); }
  });
}

const readStored = async (key: string) => (await storeRequest<Stored | undefined>("readonly", store => store.get(key)))?.blob ?? null;
const writeStored = (origin: string, path: string, blob: Blob) => storeRequest("readwrite", store => store.put({ key: origin + path, origin, blob } satisfies Stored));
const storedKeys = async (origin: string) => (await storeRequest("readonly", store => store.index("origin").getAllKeys(origin)) ?? []) as string[];

function download(origin: string, path: string): Promise<Blob | null> {
  const key = origin + path;
  let pending = downloads.get(key);
  if (!pending) {
    pending = fetch(key).then(async response => {
      const blob = response.ok ? await response.blob() : null;
      if (!blob?.type.startsWith("image/")) return null;
      await writeStored(origin, path, blob);
      return blob;
    }).catch(() => null).finally(() => downloads.delete(key));
    downloads.set(key, pending);
  }
  return pending;
}

/** Makes a displayable URL for an image, from the device copy or by downloading it. */
function load(origin: string, path: string) {
  const key = origin + path;
  if (urls.has(key)) return;
  if (!loads.has(key)) {
    loads.set(key, (async () => {
      const blob = await readStored(key) ?? await download(origin, path);
      if (blob && !urls.has(key)) { urls.set(key, URL.createObjectURL(blob)); emit(); }
    })().finally(() => loads.delete(key)));
  }
}

/** Device URL for an item's image; null while it loads, or when the item has none. */
export function useItemImage(path: string | null | undefined): string | null {
  const key = path ? serverBase() + path : null;
  const url = useSyncExternalStore(subscribe, () => key ? urls.get(key) ?? null : null);
  useEffect(() => { if (path) load(serverBase(), path); }, [path]);
  return url;
}

/** Keeps a just-uploaded image so this device does not download it again. */
export function rememberItemImage(path: string, blob: Blob) {
  void writeStored(serverBase(), path, blob);
}

let syncing: Promise<void> | null = null;
let syncAgain = false;

/** Downloads images this device lacks and deletes ones the server no longer uses. */
export function syncItemImages(): Promise<void> {
  if (syncing) { syncAgain = true; return syncing; }
  syncing = (async () => {
    do {
      syncAgain = false;
      const origin = serverBase();
      const manifest = await api.get<Manifest>("/images");
      const wanted = new Set(manifest.map(image => origin + image.image_path));
      const stored = new Set(await storedKeys(origin));
      for (const key of stored) if (!wanted.has(key)) await storeRequest("readwrite", store => store.delete(key));
      for (const [key, url] of urls) {
        if (key.startsWith(origin + "/") && !wanted.has(key)) { URL.revokeObjectURL(url); urls.delete(key); }
      }
      const missing = manifest.filter(image => !stored.has(origin + image.image_path));
      // A few downloads at a time keep the list and catalog requests responsive.
      const workers = Array.from({ length: Math.min(3, missing.length) }, async () => {
        for (let image = missing.shift(); image; image = missing.shift()) await download(origin, image.image_path);
      });
      await Promise.all(workers);
    } while (syncAgain);
  })().catch(() => { /* Offline: the next connection or change runs sync again. */ }).finally(() => { syncing = null; });
  return syncing;
}

/** Syncs images on open, on reconnect and resume, and shortly after server changes. */
export function useItemImageSync() {
  useEffect(() => {
    void navigator.storage?.persist?.().catch(() => false);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (delay: number) => { clearTimeout(timer); timer = setTimeout(() => void syncItemImages(), delay); };
    schedule(0);
    const unsubscribe = subscribeToLiveUpdates(() => schedule(2000));
    return () => { clearTimeout(timer); unsubscribe(); };
  }, []);
}

const MAX_SIDE = 1024;
const canvasBlob = (canvas: HTMLCanvasElement, type: string, quality: number) => new Promise<Blob | null>(resolve => canvas.toBlob(resolve, type, quality));

/** Shrinks a photo to at most 1024px on its longest side before upload. */
export async function prepareItemImage(file: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const webp = await canvasBlob(canvas, "image/webp", 0.82);
  if (webp?.type === "image/webp") return webp;
  // Browsers without WebP encoding fall back to JPEG, which has no transparency.
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const jpeg = await canvasBlob(canvas, "image/jpeg", 0.85);
  if (!jpeg) throw new Error("Image encoding failed");
  return jpeg;
}
