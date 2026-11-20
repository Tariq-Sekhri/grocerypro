import type { item, item_in_list, item_price_history, item_status, location, shopping_list, store_section } from "@shared/prisma-types";
import type FlattenedShoppingListItem from "@shared/types/FlattenedShoppingListItem";
import { ITEM_STATUS } from "@shared/constants/itemStatus";
import { isDevMode, setDevModeState } from "./devMode";
import { notifyLocalLiveUpdates } from "./liveUpdates";
import { screenDataCache } from "./priorityDataCache";
import { readProfile, type Profile } from "./profile";
import { apiOrigin, getServer } from "./server";
import { readShoppingListCache, shoppingListCacheKey } from "./shoppingListCache";

type Favorite = { user_id: number; item_id: number };

type SnapshotPayload = {
  items?: item[];
  store_sections?: store_section[];
  item_price_historys?: item_price_history[];
  item_in_list?: item_in_list[];
  item_status?: item_status[];
  locations?: location[];
  shopping_lists?: shopping_list[];
  users?: Profile[];
  item_favorites?: Favorite[];
};

type DevState = {
  locations: location[];
  store_sections: store_section[];
  items: item[];
  item_price_history: item_price_history[];
  item_in_list: item_in_list[];
  item_status: item_status[];
  shopping_lists: shopping_list[];
  users: Profile[];
  item_favorites: Favorite[];
  images: Map<string, { blob: Blob; url: string }>;
  nextLocationId: number;
  nextSectionId: number;
  nextItemId: number;
  nextPriceId: number;
  nextEntryId: number;
  nextListId: number;
  nextUserId: number;
};

const DEFAULT_STATUSES: item_status[] = [
  { status_id: 1, name: ITEM_STATUS.NOT_IN_CART },
  { status_id: 2, name: ITEM_STATUS.IN_CART },
  { status_id: 3, name: ITEM_STATUS.NOT_FOUND },
];

class DevApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
  }
}

let store: DevState | null = null;
let entering: Promise<void> | null = null;

const maxId = <T>(rows: T[], pick: (row: T) => number) => rows.reduce((max, row) => Math.max(max, pick(row)), 0) + 1;

function createState(snapshot: SnapshotPayload): DevState {
  const locations = (snapshot.locations ?? []).map(row => ({ ...row }));
  const store_sections = (snapshot.store_sections ?? []).map(row => ({ ...row }));
  const items = (snapshot.items ?? []).map(row => ({ ...row }));
  const item_price_history = (snapshot.item_price_historys ?? []).map(row => ({ ...row }));
  const item_in_list = (snapshot.item_in_list ?? []).map(row => ({ ...row }));
  const item_status = snapshot.item_status?.length ? snapshot.item_status.map(row => ({ ...row })) : DEFAULT_STATUSES.map(row => ({ ...row }));
  const shopping_lists = (snapshot.shopping_lists ?? []).map(row => ({ ...row }));
  const users = (snapshot.users ?? []).map(row => ({ user_id: row.user_id, name: row.name, role: row.role ?? "member" }));
  const item_favorites = (snapshot.item_favorites ?? []).map(row => ({ ...row }));
  return {
    locations,
    store_sections,
    items,
    item_price_history,
    item_in_list,
    item_status,
    shopping_lists,
    users,
    item_favorites,
    images: new Map(),
    nextLocationId: maxId(locations, r => r.location_id),
    nextSectionId: maxId(store_sections, r => r.section_id),
    nextItemId: maxId(items, r => r.item_id),
    nextPriceId: maxId(item_price_history, r => r.item_price_history_id),
    nextEntryId: maxId(item_in_list, r => r.item_in_list_id),
    nextListId: maxId(shopping_lists, r => r.shopping_list_id),
    nextUserId: maxId(users, r => r.user_id),
  };
}

/** Builds a snapshot from whatever real data is already cached on this device when offline. */
function seedFromCache(): SnapshotPayload {
  const origin = apiOrigin() || window.location.origin;
  const cachedLocations = readShoppingListCache<location[]>(shoppingListCacheKey(origin, "/locations")) ?? [];
  const profile = readProfile();
  const users = new Map<number, Profile>();
  if (profile) users.set(profile.user_id, { ...profile });

  const sections = new Map<number, store_section>();
  const items = new Map<number, item>();
  const prices: item_price_history[] = [];
  const lists: shopping_list[] = [];
  const entries: item_in_list[] = [];
  const statusIdByName = new Map(DEFAULT_STATUSES.map(s => [s.name ?? "", s.status_id]));
  let nextPriceId = 1;

  for (const loc of cachedLocations) {
    const active = readShoppingListCache<FlattenedShoppingListItem[]>(shoppingListCacheKey(origin, `/shoppingList/active?location_id=${loc.location_id}`));
    if (!active) continue;
    const listId = loc.location_id;
    lists.push({ shopping_list_id: listId, location_id: loc.location_id, paid: false, completed_at: null });
    for (const row of active) {
      if (row.buyer_id != null && !users.has(row.buyer_id)) {
        users.set(row.buyer_id, { user_id: row.buyer_id, name: row.buyer_name ?? "Buyer", role: "member" });
      }
      if (row.section_id != null && !sections.has(row.section_id)) {
        sections.set(row.section_id, {
          section_id: row.section_id,
          location_id: loc.location_id,
          name: row.section_name ?? null,
          sort_order: row.sort_order ?? null,
        });
      }
      if (row.item_id != null && !items.has(row.item_id)) {
        items.set(row.item_id, {
          item_id: row.item_id,
          name: row.item_name ?? null,
          image_path: row.image_path ?? null,
          section_id: row.section_id ?? null,
          location_id: loc.location_id,
        });
        if (row.regular_price != null) {
          prices.push({
            item_price_history_id: nextPriceId++,
            item_id: row.item_id,
            price: row.regular_price,
            effective_date: null,
          });
        }
      }
      entries.push({
        item_in_list_id: row.item_in_list_id,
        item_id: row.item_id ?? null,
        shopping_list_id: listId,
        buyer_id: row.buyer_id ?? null,
        quantity: row.quantity ?? 1,
        discount_price: row.discount_price ?? null,
        status_id: statusIdByName.get(row.status_name ?? ITEM_STATUS.NOT_IN_CART) ?? 1,
      });
    }
  }

  return {
    locations: cachedLocations,
    store_sections: [...sections.values()],
    items: [...items.values()],
    item_price_historys: prices,
    item_in_list: entries,
    item_status: DEFAULT_STATUSES,
    shopping_lists: lists,
    users: [...users.values()],
    item_favorites: [],
  };
}

async function fetchSnapshot(): Promise<SnapshotPayload> {
  if (!getServer()) return seedFromCache();
  const origin = apiOrigin();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(origin + "/v1/all", { cache: "no-store", signal: controller.signal });
    if (!response.ok) return seedFromCache();
    const data = await response.json() as SnapshotPayload;
    // Compatibility fallback if connected to a server built before item_favorites was added to /v1/all.
    if (!Array.isArray(data.item_favorites) && Array.isArray(data.locations) && data.locations.length) {
      const favorites: Favorite[] = [];
      const catalogs = await Promise.all(data.locations.map(async loc => {
        try {
          const res = await fetch(`${origin}/v1/catalog?location_id=${loc.location_id}`, { cache: "no-store", signal: controller.signal });
          if (!res.ok) return null;
          return await res.json() as { items?: { item_id: number; favorite_user_ids?: number[] }[] };
        } catch {
          return null;
        }
      }));
      for (const catalog of catalogs) {
        for (const entry of catalog?.items ?? []) {
          for (const userId of entry.favorite_user_ids ?? []) {
            favorites.push({ user_id: userId, item_id: entry.item_id });
          }
        }
      }
      data.item_favorites = favorites;
    }
    return data;
  } catch {
    return seedFromCache();
  } finally {
    clearTimeout(timer);
  }
}

/** Snapshots the real server's current data into memory and turns on dev mode. */
export function enterDevMode(): Promise<void> {
  if (isDevMode()) return Promise.resolve();
  if (entering) return entering;
  entering = (async () => {
    const snapshot = await fetchSnapshot();
    store = createState(snapshot);
    screenDataCache.invalidate();
    setDevModeState(true);
  })().finally(() => { entering = null; });
  return entering;
}

/** Discards all in-memory dev changes and returns to the normal server-backed app. */
export function exitDevMode(): void {
  if (!isDevMode()) return;
  if (store) {
    for (const entry of store.images.values()) URL.revokeObjectURL(entry.url);
    store = null;
  }
  screenDataCache.invalidate();
  setDevModeState(false);
}

export function getDevImageUrl(path: string): string | null {
  return store?.images.get(path)?.url ?? null;
}

export function rememberDevImage(path: string, blob: Blob): void {
  if (!store) return;
  const previous = store.images.get(path);
  if (previous) URL.revokeObjectURL(previous.url);
  store.images.set(path, { blob, url: URL.createObjectURL(blob) });
}

function requireStore(): DevState {
  if (!store) store = createState(seedFromCache());
  return store;
}

function latestPrice(state: DevState, itemId: number | null, completedAt: Date | string | null = null): number | null {
  if (itemId == null) return null;
  const cutoff = completedAt ? new Date(completedAt).getTime() : null;
  let best: item_price_history | null = null;
  for (const row of state.item_price_history) {
    if (row.item_id !== itemId) continue;
    if (cutoff !== null && row.effective_date != null && new Date(row.effective_date).getTime() > cutoff) continue;
    if (!best || row.item_price_history_id > best.item_price_history_id) best = row;
  }
  return best?.price ?? null;
}

function statusIdFor(state: DevState, name: string): number | null {
  return state.item_status.find(s => s.name === name)?.status_id ?? null;
}

function flattenEntry(state: DevState, entry: item_in_list, completedAt: Date | string | null = null): FlattenedShoppingListItem {
  const product = entry.item_id != null ? state.items.find(i => i.item_id === entry.item_id) : undefined;
  const section = product?.section_id != null ? state.store_sections.find(s => s.section_id === product.section_id) : undefined;
  const buyer = entry.buyer_id != null ? state.users.find(u => u.user_id === entry.buyer_id) : undefined;
  const status = entry.status_id != null ? state.item_status.find(s => s.status_id === entry.status_id) : undefined;
  return {
    item_in_list_id: entry.item_in_list_id,
    item_id: entry.item_id,
    buyer_id: entry.buyer_id,
    quantity: entry.quantity,
    discount_price: entry.discount_price,
    status_id: entry.status_id,
    regular_price: latestPrice(state, entry.item_id, completedAt),
    status_name: status?.name ?? null,
    buyer_name: buyer?.name ?? null,
    item_name: product?.name ?? null,
    image_path: product?.image_path ?? null,
    section_id: section?.section_id,
    section_name: section?.name ?? null,
    sort_order: section?.sort_order ?? null,
  };
}

function activeListFor(state: DevState, locationId: number): shopping_list | undefined {
  return state.shopping_lists
    .filter(l => l.location_id === locationId && l.completed_at == null)
    .sort((a, b) => b.shopping_list_id - a.shopping_list_id)[0];
}

function actingAdmin(state: DevState): Profile | null {
  const current = readProfile();
  if (!current) return null;
  const found = state.users.find(u => u.user_id === current.user_id);
  return found?.role === "admin" ? found : null;
}

function completeDevList(state: DevState, listId: number): shopping_list | null {
  const list = state.shopping_lists.find(l => l.shopping_list_id === listId);
  if (!list) return null;
  if (list.completed_at) return list;
  const entries = state.item_in_list.filter(e => e.shopping_list_id === listId);
  const statusOf = (e: item_in_list) => state.item_status.find(s => s.status_id === e.status_id)?.name;
  if (!entries.some(e => statusOf(e) === ITEM_STATUS.IN_CART)
    || entries.some(e => statusOf(e) !== ITEM_STATUS.IN_CART && statusOf(e) !== ITEM_STATUS.NOT_FOUND)) {
    return null;
  }
  list.completed_at = new Date().toISOString() as unknown as Date;
  list.paid = true;
  const unavailable = entries.filter(e => statusOf(e) === ITEM_STATUS.NOT_FOUND);
  if (unavailable.length) {
    const nextList: shopping_list = {
      shopping_list_id: state.nextListId++,
      location_id: list.location_id,
      paid: false,
      completed_at: null,
    };
    state.shopping_lists.push(nextList);
    const notInCartId = statusIdFor(state, ITEM_STATUS.NOT_IN_CART);
    for (const entry of unavailable) {
      state.item_in_list.push({
        item_in_list_id: state.nextEntryId++,
        item_id: entry.item_id,
        shopping_list_id: nextList.shopping_list_id,
        buyer_id: entry.buyer_id,
        quantity: entry.quantity,
        discount_price: entry.discount_price,
        status_id: notInCartId,
      });
    }
  }
  return list;
}

function writeDone<T>(result: T): T {
  screenDataCache.invalidate();
  notifyLocalLiveUpdates();
  return result;
}

function routeDev(state: DevState, method: string, rawPath: string, body?: unknown): unknown {
  const url = new URL(rawPath, "http://dev.local");
  const path = url.pathname;
  const query = url.searchParams;
  let match: RegExpMatchArray | null;

  if (path === "/profiles" && method === "GET") {
    return [...state.users].sort((a, b) => a.user_id - b.user_id);
  }
  if (path === "/profiles" && method === "POST") {
    const payload = (body ?? {}) as { name?: unknown; role?: unknown };
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    if (!name || name.length > 40) throw new DevApiError("Enter a name up to 40 characters.", 400);
    if (state.users.length && !actingAdmin(state)) throw new DevApiError("Only an admin can add profiles.", 403);
    if (state.users.some(p => p.name?.toLocaleLowerCase() === name.toLocaleLowerCase())) {
      throw new DevApiError(`${name} already exists.`, 409);
    }
    const requestedRole = payload.role === "admin" || payload.role === "member" || payload.role === "shared" ? payload.role : "member";
    const profile: Profile = { user_id: state.nextUserId++, name, role: state.users.length ? requestedRole : "admin" };
    state.users.push(profile);
    return writeDone(profile);
  }
  if ((match = path.match(/^\/profiles\/(\d+)$/)) && method === "DELETE") {
    const id = Number(match[1]);
    const admin = actingAdmin(state);
    if (!admin) throw new DevApiError("Only an admin can delete profiles.", 403);
    if (admin.user_id === id) throw new DevApiError("You can't delete the profile you're using.", 409);
    const index = state.users.findIndex(u => u.user_id === id);
    if (index === -1) throw new DevApiError("Profile not found.", 404);
    const [removed] = state.users.splice(index, 1);
    for (const entry of state.item_in_list) if (entry.buyer_id === id) entry.buyer_id = null;
    state.item_favorites = state.item_favorites.filter(f => f.user_id !== id);
    return writeDone(removed);
  }

  if (path === "/locations" && method === "GET") {
    return [...state.locations];
  }
  if (path === "/locations" && method === "POST") {
    const payload = (body ?? {}) as { name?: string | null; address?: string | null };
    const created: location = {
      location_id: state.nextLocationId++,
      name: payload.name ?? null,
      address: payload.address ?? null,
    };
    state.locations.push(created);
    return writeDone(created);
  }
  if ((match = path.match(/^\/locations\/(\d+)$/)) && method === "GET") {
    const id = Number(match[1]);
    return state.locations.find(l => l.location_id === id) ?? null;
  }
  if ((match = path.match(/^\/locations\/(\d+)$/)) && method === "PATCH") {
    const id = Number(match[1]);
    const loc = state.locations.find(l => l.location_id === id);
    if (!loc) throw new DevApiError("Store not found.", 404);
    const payload = (body ?? {}) as { name?: string | null; address?: string | null };
    if ("name" in payload) loc.name = payload.name ?? null;
    if ("address" in payload) loc.address = payload.address ?? null;
    return writeDone({ ...loc });
  }
  if ((match = path.match(/^\/locations\/(\d+)$/)) && method === "DELETE") {
    const id = Number(match[1]);
    state.locations = state.locations.filter(l => l.location_id !== id);
    state.store_sections = state.store_sections.filter(s => s.location_id !== id);
    const removedItemIds = new Set(state.items.filter(i => i.location_id === id).map(i => i.item_id));
    state.items = state.items.filter(i => i.location_id !== id);
    state.item_price_history = state.item_price_history.filter(p => p.item_id == null || !removedItemIds.has(p.item_id));
    state.item_favorites = state.item_favorites.filter(f => !removedItemIds.has(f.item_id));
    const removedListIds = new Set(state.shopping_lists.filter(l => l.location_id === id).map(l => l.shopping_list_id));
    state.shopping_lists = state.shopping_lists.filter(l => l.location_id !== id);
    state.item_in_list = state.item_in_list.filter(e => (e.item_id == null || !removedItemIds.has(e.item_id)) && (e.shopping_list_id == null || !removedListIds.has(e.shopping_list_id)));
    return writeDone(undefined);
  }

  if ((match = path.match(/^\/locations\/(\d+)\/sections$/)) && method === "GET") {
    const id = Number(match[1]);
    return state.store_sections
      .filter(s => s.location_id === id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.section_id - b.section_id);
  }
  if ((match = path.match(/^\/locations\/(\d+)\/sections$/)) && method === "POST") {
    const id = Number(match[1]);
    const name = typeof (body as { name?: unknown } | undefined)?.name === "string"
      ? ((body as { name: string }).name).trim()
      : "";
    if (!name || name.length > 255) throw new DevApiError("Enter an aisle name.", 400);
    if (!state.locations.some(l => l.location_id === id)) throw new DevApiError("Store not found.", 404);
    if (state.store_sections.some(s => s.location_id === id && s.name?.toLocaleLowerCase() === name.toLocaleLowerCase())) {
      throw new DevApiError("That aisle already exists.", 409);
    }
    const maxSort = state.store_sections.filter(s => s.location_id === id).reduce((max, s) => Math.max(max, s.sort_order ?? 0), 0);
    const created: store_section = { section_id: state.nextSectionId++, location_id: id, name, sort_order: maxSort + 1 };
    state.store_sections.push(created);
    return writeDone(created);
  }

  if ((path === "/shoppingList/active" || path === "/shoppingList/active/") && method === "GET") {
    const locationId = Number(query.get("location_id"));
    if (!locationId) throw new DevApiError("location_id query parameter is required", 400);
    const list = activeListFor(state, locationId);
    if (!list) return [];
    return state.item_in_list.filter(e => e.shopping_list_id === list.shopping_list_id).map(e => flattenEntry(state, e));
  }

  if ((match = path.match(/^\/locations\/(\d+)\/shoppingList\/complete$/)) && method === "POST") {
    const id = Number(match[1]);
    const list = activeListFor(state, id);
    if (!list) throw new DevApiError("This trip is already finished.", 409);
    const completed = completeDevList(state, list.shopping_list_id);
    if (!completed) throw new DevApiError("Some items are still to get.", 409);
    return writeDone({ ...completed });
  }

  if (path === "/catalog" && method === "GET") {
    const locationId = Number(query.get("location_id"));
    if (!locationId) throw new DevApiError("Choose a store first.", 400);
    return {
      items: state.items
        .filter(i => i.location_id === locationId)
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
        .map(product => ({
          ...product,
          favorite_user_ids: state.item_favorites.filter(f => f.item_id === product.item_id).map(f => f.user_id),
          section_name: state.store_sections.find(s => s.section_id === product.section_id)?.name ?? null,
          price: latestPrice(state, product.item_id),
        })),
      buyers: [...state.users].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
      sections: state.store_sections.filter(s => s.location_id === locationId).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
      statuses: state.item_status,
    };
  }

  if ((match = path.match(/^\/catalog\/(\d+)\/favorite$/)) && method === "PUT") {
    const itemId = Number(match[1]);
    const payload = (body ?? {}) as { user_id?: unknown; favorite?: unknown };
    if (typeof payload.user_id !== "number" || typeof payload.favorite !== "boolean") {
      throw new DevApiError("Choose a valid item and profile.", 400);
    }
    const userId = payload.user_id;
    const favorite = payload.favorite;
    if (!state.items.some(i => i.item_id === itemId) || !state.users.some(u => u.user_id === userId)) {
      throw new DevApiError("Item or profile not found.", 404);
    }
    state.item_favorites = state.item_favorites.filter(f => !(f.user_id === userId && f.item_id === itemId));
    if (favorite) state.item_favorites.push({ user_id: userId, item_id: itemId });
    return writeDone({ item_id: itemId, user_id: userId, favorite });
  }

  if (path === "/catalog" && method === "POST") {
    const payload = (body ?? {}) as { name?: unknown; section_id?: unknown; price?: unknown; location_id?: unknown };
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const locationId = Number(payload.location_id);
    const sectionId = payload.section_id == null ? null : Number(payload.section_id);
    const price = payload.price == null ? null : Number(payload.price);
    if (!name || !locationId) throw new DevApiError("Enter a name, a valid aisle and a non-negative price.", 400);
    if (!state.locations.some(l => l.location_id === locationId)) throw new DevApiError("Store not found.", 404);
    if (sectionId !== null && !state.store_sections.some(s => s.section_id === sectionId && s.location_id === locationId)) {
      throw new DevApiError("This aisle does not belong to the store.", 400);
    }
    const created: item = { item_id: state.nextItemId++, name, image_path: null, section_id: sectionId, location_id: locationId };
    state.items.push(created);
    if (price !== null) {
      state.item_price_history.push({
        item_price_history_id: state.nextPriceId++,
        item_id: created.item_id,
        price,
        effective_date: new Date(),
      });
    }
    return writeDone({ ...created });
  }

  if ((match = path.match(/^\/catalog\/(\d+)$/)) && method === "GET") {
    const id = Number(match[1]);
    const product = state.items.find(i => i.item_id === id);
    if (!product) throw new DevApiError("Item not found.", 404);
    return {
      item: { ...product },
      price: latestPrice(state, id),
      sections: state.store_sections.filter(s => s.location_id === product.location_id).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    };
  }

  if ((match = path.match(/^\/catalog\/(\d+)$/)) && method === "PATCH") {
    const id = Number(match[1]);
    const product = state.items.find(i => i.item_id === id);
    if (!product) throw new DevApiError("Item not found.", 404);
    const payload = (body ?? {}) as { name?: unknown; section_id?: unknown; price?: unknown };
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const sectionId = payload.section_id == null ? null : Number(payload.section_id);
    const price = payload.price == null ? null : Number(payload.price);
    if (!name) throw new DevApiError("Enter a name, a valid aisle and a non-negative price.", 400);
    if (sectionId !== null && !state.store_sections.some(s => s.section_id === sectionId && s.location_id === product.location_id)) {
      throw new DevApiError("This aisle does not belong to the store.", 400);
    }
    product.name = name;
    product.section_id = sectionId;
    if (price !== null && latestPrice(state, id) !== price) {
      state.item_price_history.push({
        item_price_history_id: state.nextPriceId++,
        item_id: id,
        price,
        effective_date: new Date(),
      });
    }
    return writeDone({ ...product });
  }

  if ((match = path.match(/^\/item\/(\d+)$/)) && method === "DELETE") {
    const id = Number(match[1]);
    state.items = state.items.filter(i => i.item_id !== id);
    state.item_in_list = state.item_in_list.filter(e => e.item_id !== id);
    state.item_price_history = state.item_price_history.filter(p => p.item_id !== id);
    state.item_favorites = state.item_favorites.filter(f => f.item_id !== id);
    return writeDone(undefined);
  }

  if ((match = path.match(/^\/catalog\/(\d+)\/image$/)) && method === "PUT") {
    const id = Number(match[1]);
    const product = state.items.find(i => i.item_id === id);
    if (!product) throw new DevApiError("Item not found.", 404);
    if (!(body instanceof Blob)) throw new DevApiError("Upload a JPEG, PNG or WebP image.", 415);
    const imagePath = `/dev-images/items/${id}-${Date.now()}`;
    rememberDevImage(imagePath, body);
    product.image_path = imagePath;
    return writeDone({ ...product });
  }

  if ((match = path.match(/^\/catalog\/(\d+)\/image$/)) && method === "DELETE") {
    const id = Number(match[1]);
    const product = state.items.find(i => i.item_id === id);
    if (!product) throw new DevApiError("Item not found.", 404);
    product.image_path = null;
    return writeDone({ ...product });
  }

  if (path === "/images" && method === "GET") {
    return state.items
      .filter(i => i.image_path != null)
      .map(i => ({ item_id: i.item_id, image_path: i.image_path! }));
  }

  if (path === "/listEntries" && method === "POST") {
    const payload = (body ?? {}) as { location_id?: number; entries?: { item_id: number; quantity: number; buyer_id: number | null }[] };
    const locationId = Number(payload.location_id);
    const entries = payload.entries ?? [];
    if (!locationId || !entries.length) throw new DevApiError("Select items with a whole quantity between 1 and 9999.", 400);
    let list = activeListFor(state, locationId);
    if (!list) {
      list = { shopping_list_id: state.nextListId++, location_id: locationId, paid: false, completed_at: null };
      state.shopping_lists.push(list);
    }
    const notInCartId = statusIdFor(state, ITEM_STATUS.NOT_IN_CART);
    for (const entry of entries) {
      const existing = state.item_in_list.find(e => e.shopping_list_id === list.shopping_list_id && e.item_id === entry.item_id && (e.buyer_id ?? null) === (entry.buyer_id ?? null));
      if (existing) {
        if ((existing.quantity ?? 0) + entry.quantity > 9999) throw new DevApiError("Quantity limit exceeded.", 400);
        existing.quantity = (existing.quantity ?? 0) + entry.quantity;
      } else {
        state.item_in_list.push({
          item_in_list_id: state.nextEntryId++,
          item_id: entry.item_id,
          shopping_list_id: list.shopping_list_id,
          buyer_id: entry.buyer_id,
          quantity: entry.quantity,
          discount_price: null,
          status_id: notInCartId,
        });
      }
    }
    return writeDone({ shopping_list_id: list.shopping_list_id });
  }

  if ((match = path.match(/^\/listEntries\/(\d+)$/)) && method === "GET") {
    const id = Number(match[1]);
    const entry = state.item_in_list.find(e => e.item_in_list_id === id);
    if (!entry) throw new DevApiError("This item is no longer on the list.", 404);
    const product = entry.item_id != null ? state.items.find(i => i.item_id === entry.item_id) ?? null : null;
    const list = entry.shopping_list_id != null ? state.shopping_lists.find(l => l.shopping_list_id === entry.shopping_list_id) ?? null : null;
    return {
      entry: { ...entry, item: product, shopping_list: list },
      buyers: [...state.users].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
    };
  }

  if ((match = path.match(/^\/listEntries\/(\d+)\/status$/)) && method === "PATCH") {
    const id = Number(match[1]);
    const entry = state.item_in_list.find(e => e.item_in_list_id === id);
    if (!entry) throw new DevApiError("This item is no longer on the list.", 404);
    const list = entry.shopping_list_id != null ? state.shopping_lists.find(l => l.shopping_list_id === entry.shopping_list_id) : undefined;
    if (list?.completed_at) throw new DevApiError("Completed lists cannot be changed.", 409);
    const requested = (body as { status?: string } | undefined)?.status;
    const currentStatus = state.item_status.find(s => s.status_id === entry.status_id)?.name;
    const nextStatus = requested ?? (currentStatus === ITEM_STATUS.IN_CART ? ITEM_STATUS.NOT_IN_CART : ITEM_STATUS.IN_CART);
    entry.status_id = statusIdFor(state, nextStatus);
    if (!requested && entry.shopping_list_id != null) completeDevList(state, entry.shopping_list_id);
    return writeDone({ ...entry });
  }

  if ((match = path.match(/^\/listEntries\/(\d+)\/aisle$/)) && method === "PATCH") {
    const id = Number(match[1]);
    const entry = state.item_in_list.find(e => e.item_in_list_id === id);
    const product = entry?.item_id != null ? state.items.find(i => i.item_id === entry.item_id) : undefined;
    if (!entry || !product) throw new DevApiError("This item is no longer on the list.", 404);
    const list = entry.shopping_list_id != null ? state.shopping_lists.find(l => l.shopping_list_id === entry.shopping_list_id) : undefined;
    if (list?.completed_at) throw new DevApiError("Completed lists cannot be changed.", 409);
    const sectionId = (body as { section_id?: number | null } | undefined)?.section_id ?? null;
    if (sectionId !== null && !state.store_sections.some(s => s.section_id === sectionId && s.location_id === product.location_id)) {
      throw new DevApiError("This aisle does not belong to the store.", 400);
    }
    product.section_id = sectionId;
    return writeDone({ ...product });
  }

  if ((match = path.match(/^\/listEntries\/(\d+)$/)) && method === "PATCH") {
    const id = Number(match[1]);
    const entry = state.item_in_list.find(e => e.item_in_list_id === id);
    if (!entry) throw new DevApiError("This item is no longer on the list.", 404);
    const list = entry.shopping_list_id != null ? state.shopping_lists.find(l => l.shopping_list_id === entry.shopping_list_id) : undefined;
    if (list?.completed_at) throw new DevApiError("Completed lists cannot be changed.", 409);
    const payload = (body ?? {}) as { buyer_id: number | null; quantity: number; discount_price: number | null };
    if (payload.buyer_id !== null && !state.users.some(u => u.user_id === payload.buyer_id)) {
      throw new DevApiError("Buyer not found.", 400);
    }
    if (payload.discount_price !== null && entry.item_id != null && latestPrice(state, entry.item_id) == null) {
      state.item_price_history.push({
        item_price_history_id: state.nextPriceId++,
        item_id: entry.item_id,
        price: payload.discount_price,
        effective_date: new Date(),
      });
    }
    entry.buyer_id = payload.buyer_id;
    entry.quantity = payload.quantity;
    entry.discount_price = payload.discount_price;
    return writeDone({ ...entry });
  }

  if ((match = path.match(/^\/listEntries\/(\d+)$/)) && method === "DELETE") {
    const id = Number(match[1]);
    const entry = state.item_in_list.find(e => e.item_in_list_id === id);
    if (!entry) throw new DevApiError("This item is no longer on the list.", 404);
    const list = entry.shopping_list_id != null ? state.shopping_lists.find(l => l.shopping_list_id === entry.shopping_list_id) : undefined;
    if (list?.completed_at) throw new DevApiError("Completed lists cannot be changed.", 409);
    state.item_in_list = state.item_in_list.filter(e => e.item_in_list_id !== id);
    return writeDone(undefined);
  }

  if ((match = path.match(/^\/listHistory\/detail\/(\d+)$/)) && method === "GET") {
    const id = Number(match[1]);
    const list = state.shopping_lists.find(l => l.shopping_list_id === id);
    if (!list) throw new DevApiError("List not found.", 404);
    return {
      list: { ...list, location: state.locations.find(l => l.location_id === list.location_id) ?? null },
      items: state.item_in_list.filter(e => e.shopping_list_id === id).map(e => flattenEntry(state, e, list.completed_at)),
    };
  }

  if ((match = path.match(/^\/listHistory\/(\d+)$/)) && method === "GET") {
    const locationId = Number(match[1]);
    return state.shopping_lists
      .filter(l => l.location_id === locationId && l.completed_at != null)
      .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())
      .map(list => ({
        ...list,
        _count: { item_in_list: state.item_in_list.filter(e => e.shopping_list_id === list.shopping_list_id).length },
      }));
  }

  throw new DevApiError("Not found.", 404);
}

/** Handles all `/v1` requests in memory when dev mode is active. */
export async function devRequest<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const state = requireStore();
  return routeDev(state, method, path, body) as T;
}
