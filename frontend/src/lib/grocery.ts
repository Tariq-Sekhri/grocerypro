import type { item, location, shopping_list, store_section } from "@shared/prisma-types";
import type FlattenedShoppingListItem from "@shared/types/FlattenedShoppingListItem";

export type { location, FlattenedShoppingListItem };
export type Buyer = { user_id: number; name: string | null; role?: string };
export type CatalogItem = item & { section_name: string | null; price: number | null; favorite_user_ids: number[] };
export type CatalogData = { items: CatalogItem[]; buyers: Buyer[]; sections: store_section[]; statuses: { status_id: number; name: string | null }[] };
export type ItemData = { item: item; price: number | null; sections: store_section[] };
export type EntryData = { entry: { item_in_list_id: number; buyer_id: number | null; quantity: number | null; discount_price: number | null; item: item | null; shopping_list: shopping_list | null }; buyers: Buyer[] };
export type HistoryList = shopping_list & { _count: { item_in_list: number } };
export type HistoryDetail = { list: shopping_list & { location: location | null }; items: FlattenedShoppingListItem[] };
export type Choice = { value: string; label: string; shared?: boolean };
export type ListFilters = { buyer: string; section: string };

export const money = (cents: number | null | undefined) => cents == null ? "Price not set" : new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(cents / 100);
export const priceInput = (cents: number | null | undefined) => cents == null ? "" : (cents / 100).toFixed(2);
export const parsePrice = (text: string) => text.trim() === "" ? null : Math.round(Number(text) * 100);
export const validPrice = (text: string) => text === "" || (/^\d+(\.\d{0,2})?$/.test(text) && Number(text) <= 21474836.47);

/** Keeps a price field to digits with at most one dot and two decimals. */
export function formatPriceInput(text: string) {
  let formatted = text
    .replace(/[^0-9.]/g, "")
    .replace(/^0+(\d)/, "$1")
    .replace(/^\./, "0.")
    .replace(/(\..*?)\./g, "$1");
  if (formatted.includes(".")) {
    const [integer, decimal] = formatted.split(".");
    formatted = `${integer}.${decimal.slice(0, 2)}`;
  }
  return formatted;
}

export function tripDate(date: Date | string | null) {
  return date ? new Date(date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }) : "Current shopping list";
}

export function buyerChoices(buyers: Buyer[]): Choice[] {
  return [{ value: "none", label: "Unassigned" }, ...buyers.map(b => ({ value: String(b.user_id), label: b.name ?? "Buyer", shared: b.role === "shared" }))];
}

export function catalogFavorite(item: CatalogItem, userId: number | null, overrides: Record<string, boolean> = {}) {
  return userId !== null && (overrides[userId + ":" + item.item_id] ?? item.favorite_user_ids?.includes(userId) ?? false);
}

export function sortedCatalog(items: CatalogItem[], search: string, userId: number | null, overrides: Record<string, boolean> = {}) {
  return items.filter(item => (item.name ?? "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(catalogFavorite(b, userId, overrides)) - Number(catalogFavorite(a, userId, overrides))
      || (a.name ?? "").localeCompare(b.name ?? ""));
}

const filterKey = (locationId: number) => "grocerypro.filters." + locationId;
export const defaultFilters: ListFilters = { buyer: "all", section: "all" };

/** List filters last for the session, per store, like the old navigation params. */
export function loadFilters(locationId: number): ListFilters {
  try { return { ...defaultFilters, ...JSON.parse(sessionStorage.getItem(filterKey(locationId)) ?? "{}") }; }
  catch { return defaultFilters; }
}
export function saveFilters(locationId: number, filters: ListFilters) {
  sessionStorage.setItem(filterKey(locationId), JSON.stringify(filters));
}

/** Distinct buyers and aisles present on a shopping list, for the filter choices. */
export function listChoices(items: FlattenedShoppingListItem[]) {
  const buyers: Choice[] = [...new Map(items.map(i => [String(i.buyer_id ?? "none"), { value: String(i.buyer_id ?? "none"), label: i.buyer_name ?? "Unassigned" }])).values()];
  const sections: Choice[] = [...new Map(items.map(i => [String(i.section_id ?? "none"), { value: String(i.section_id ?? "none"), label: i.section_name ?? "No aisle assigned" }])).values()];
  return { buyers, sections };
}
