/** Active lists, locations, and store names are cached per server/store. */
export function shoppingListCacheKey(origin: string, path: string): string | null {
  const prefix = /^\/shoppingList\/active\?location_id=\d+$/.test(path) ? "grocerypro.shopping-list.v1:"
    : /^\/locations\/\d+$/.test(path) ? "grocerypro.store.v1:"
    : path === "/locations" ? "grocerypro.locations.v1:" : null;
  return prefix ? prefix + JSON.stringify([origin, path]) : null;
}

export function readShoppingListCache<T>(key: string | null): T | null {
  if (!key) return null;
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
    if (key.startsWith("grocerypro.locations.v1:")) {
      return Array.isArray(value) && value.every(isLocation) ? value as T : null;
    }
    if (key.startsWith("grocerypro.store.v1:")) {
      if (value === null) {
        const [origin, path] = JSON.parse(key.slice("grocerypro.store.v1:".length)) as [string, string];
        const locations = readShoppingListCache<{ location_id: number }[]>(shoppingListCacheKey(origin, "/locations"));
        return locations?.find(store => store.location_id === Number(path.split("/")[2])) as T ?? null;
      }
      return isLocation(value) ? value as T : null;
    }
    if (!Array.isArray(value) || !value.every(item => item && typeof item === "object"
      && Number.isInteger(item.item_in_list_id))) return null;
    return value as T;
  } catch {
    return null;
  }
}

function isLocation(value: unknown): boolean {
  return !!value && typeof value === "object" && "location_id" in value && Number.isInteger(value.location_id)
    && "name" in value && (typeof value.name === "string" || value.name === null);
}

export function writeShoppingListCache(key: string | null, data: unknown): void {
  if (!key) return;
  try { localStorage.setItem(key, JSON.stringify(data)); }
  catch { /* A full or unavailable cache must not block the server's list. */ }
}
