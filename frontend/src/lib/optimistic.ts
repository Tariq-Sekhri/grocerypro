import { useSyncExternalStore } from "react";
import { errorMessage, peekScreenData } from "./api";
import { screenDataCache } from "./priorityDataCache";
import { apiOrigin } from "./server";
import { readShoppingListCache, shoppingListCacheKey, writeShoppingListCache } from "./shoppingListCache";

/**
 * Saves are assumed to work. The screen updates and moves on at once, the
 * request runs in the background, and a failure undoes the change and says so.
 */
export function inBackground(task: () => Promise<unknown>, undo?: () => void) {
  task().catch(error => { undo?.(); notify(`Not saved. ${errorMessage(error)}`); });
}

/**
 * Applies `update` to the locally cached copy of `path` so the next screen to
 * read it shows the change. Returns a function that restores the previous copy.
 */
export function patchCached<T>(path: string, update: (data: T) => T): () => void {
  const key = shoppingListCacheKey(apiOrigin() || window.location.origin, path);
  const before = readShoppingListCache<T>(key) ?? peekScreenData<T>(path);
  if (!key || !before) return () => {};
  writeShoppingListCache(key, update(before));
  screenDataCache.invalidate();
  return () => { writeShoppingListCache(key, before); screenDataCache.invalidate(); };
}

let notice: { id: number; text: string } | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

export function notify(text: string) {
  notice = { id: Date.now(), text };
  listeners.forEach(listener => listener());
  clearTimeout(timer);
  timer = setTimeout(dismissNotice, 6000);
}
export function dismissNotice() {
  notice = null;
  listeners.forEach(listener => listener());
}
export function useNotice() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => notice);
}
