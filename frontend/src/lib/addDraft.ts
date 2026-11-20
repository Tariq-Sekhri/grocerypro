import { useSyncExternalStore } from "react";
import { isDevMode, onDevModeChange } from "./devMode";

/**
 * The items picked on Add Items for one store, kept on the device until they
 * are added to the list or cleared. It survives leaving the screen (to create
 * a new item, edit one, or check the list), closing the app and restarts.
 */
export type AddDraft = {
  /** item_id -> quantity */
  selected: Record<number, number>;
  /** item_id -> buyer choice, where it differs from `buyer` */
  itemBuyers: Record<number, string>;
  /** "Buying for", once changed from the profile's default */
  buyer?: string;
  search: string;
};

const empty: AddDraft = { selected: {}, itemBuyers: {}, search: "" };
const key = (locationId: number) => `grocerypro.addDraft.${locationId}`;
const cache = new Map<number, AddDraft>();
const devCache = new Map<number, AddDraft>();
const listeners = new Set<() => void>();

onDevModeChange(() => {
  devCache.clear();
  listeners.forEach(listener => listener());
});

function readStoredAddDraft(locationId: number): AddDraft {
  const cached = cache.get(locationId);
  if (cached) return cached;
  let draft = empty;
  try {
    const parsed = JSON.parse(localStorage.getItem(key(locationId)) ?? "null") as Partial<AddDraft> | null;
    if (parsed && typeof parsed === "object") draft = { ...empty, ...parsed };
  } catch { /* Start empty. */ }
  cache.set(locationId, draft);
  return draft;
}

export function readAddDraft(locationId: number): AddDraft {
  if (isDevMode()) {
    const cached = devCache.get(locationId);
    if (cached) return cached;
    const initial = readStoredAddDraft(locationId);
    const copy: AddDraft = { ...initial, selected: { ...initial.selected }, itemBuyers: { ...initial.itemBuyers } };
    devCache.set(locationId, copy);
    return copy;
  }
  return readStoredAddDraft(locationId);
}

export function updateAddDraft(locationId: number, change: (draft: AddDraft) => AddDraft) {
  const next = change(readAddDraft(locationId));
  next.selected = Object.fromEntries(Object.entries(next.selected).filter(([, quantity]) => quantity > 0));
  if (isDevMode()) {
    devCache.set(locationId, next);
    listeners.forEach(listener => listener());
    return;
  }
  cache.set(locationId, next);
  try {
    const blank = !Object.keys(next.selected).length && !Object.keys(next.itemBuyers).length && next.buyer === undefined && !next.search;
    if (blank) localStorage.removeItem(key(locationId));
    else localStorage.setItem(key(locationId), JSON.stringify(next));
  } catch { /* Kept in memory for this session. */ }
  listeners.forEach(listener => listener());
}

export const clearAddDraft = (locationId: number) => updateAddDraft(locationId, () => empty);

/** Selects an item created from Add Items, so it is part of the planned adds. */
export const selectNewItem = (locationId: number, itemId: number) =>
  updateAddDraft(locationId, draft => ({ ...draft, selected: { ...draft.selected, [itemId]: Math.max(1, draft.selected[itemId] ?? 0) }, search: "" }));

export function useAddDraft(locationId: number) {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => readAddDraft(locationId));
}
