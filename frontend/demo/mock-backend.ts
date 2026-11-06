// Fake Grocery Pro backend for screenshots. Loaded only by `npm run demo`
// (GROCERYPRO_DEMO=1); nothing here is part of the normal app or build.
import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";

const profiles = [
  { user_id: 1, name: "Alex", role: "admin" },
  { user_id: 2, name: "Sam", role: "member" },
  { user_id: 3, name: "Mom", role: "member" },
  { user_id: 4, name: "Dad", role: "member" },
  { user_id: 5, name: "Family", role: "member" },
];
const buyers = profiles.map(({ user_id, name }) => ({ user_id, name }));

const locations = [
  { location_id: 1, name: "Maple Market", address: "120 Example Ave" },
  { location_id: 2, name: "Harbour Foods", address: "45 Sample St" },
  { location_id: 3, name: "Corner Pantry", address: "8 Demo Rd" },
  { location_id: 4, name: "Bulk Barn Co.", address: "300 Placeholder Blvd" },
];

const aisleNames = ["Produce", "Dairy", "Bakery", "Pantry", "Frozen", "Snacks", "Household"];
const sections = locations.flatMap(loc => aisleNames.map((name, i) => ({
  section_id: loc.location_id * 100 + i + 1, location_id: loc.location_id, name, sort_order: i + 1,
})));
const sectionId = (locationId: number, aisle: string) => locationId * 100 + aisleNames.indexOf(aisle) + 1;

// [name, aisle, price in cents, emoji, background]
const products: [string, string, number | null, string, string][] = [
  ["Bananas", "Produce", 179, "🍌", "#F4E3A1"],
  ["Gala Apples", "Produce", 449, "🍎", "#F5B7B1"],
  ["Avocados", "Produce", 399, "🥑", "#C8E6B0"],
  ["Baby Spinach", "Produce", 549, "🥬", "#BFE3C0"],
  ["Strawberries", "Produce", 599, "🍓", "#F8C4CC"],
  ["Carrots", "Produce", 229, "🥕", "#F9D1A8"],
  ["2% Milk (4 L)", "Dairy", 629, "🥛", "#E3ECF5"],
  ["Large Eggs (12)", "Dairy", 489, "🥚", "#F3E9D8"],
  ["Greek Yogurt", "Dairy", 579, "🍶", "#E6E9F5"],
  ["Cheddar Cheese", "Dairy", 799, "🧀", "#FBE3A6"],
  ["Butter", "Dairy", 649, "🧈", "#FAEBB5"],
  ["Sourdough Bread", "Bakery", 499, "🍞", "#EBD3B0"],
  ["Bagels (6)", "Bakery", 399, "🥯", "#EAD2B8"],
  ["Croissants", "Bakery", 649, "🥐", "#F1D9AE"],
  ["Spaghetti", "Pantry", 249, "🍝", "#F3DDB3"],
  ["Basmati Rice", "Pantry", 1199, "🍚", "#ECECEC"],
  ["Peanut Butter", "Pantry", 549, "🥜", "#E8C99A"],
  ["Olive Oil", "Pantry", 1299, "🫒", "#D4E2B0"],
  ["Coffee Beans", "Pantry", 1499, "☕", "#D7C0AA"],
  ["Frozen Pizza", "Frozen", 799, "🍕", "#F6C9A0"],
  ["Ice Cream", "Frozen", 699, "🍨", "#F1D4E5"],
  ["Frozen Berries", "Frozen", 899, "🫐", "#CBD3F0"],
  ["Potato Chips", "Snacks", 399, "🥔", "#F6E2A2"],
  ["Dark Chocolate", "Snacks", 349, "🍫", "#D8BBA5"],
  ["Popcorn", "Snacks", 299, "🍿", "#F8E7B9"],
  ["Paper Towels", "Household", 1099, "🧻", "#E5E8EC"],
  ["Dish Soap", "Household", 379, "🧼", "#CDE7F2"],
  ["Sparkling Water", "Snacks", null, "💧", "#CFE8F0"],
];

type Item = { item_id: number; name: string; image_path: string; section_id: number | null; location_id: number; price: number | null; emoji: string; bg: string };
const items: Item[] = locations.flatMap(loc => products.map(([name, aisle, price, emoji, bg], i) => ({
  item_id: loc.location_id * 1000 + i + 1, name, image_path: `/images/items/${loc.location_id * 1000 + i + 1}.svg`,
  section_id: name === "Sparkling Water" ? null : sectionId(loc.location_id, aisle), location_id: loc.location_id,
  price: price === null ? null : price + loc.location_id * 10 - 10, emoji, bg,
})));
const itemById = new Map(items.map(item => [item.item_id, item]));
const favorites = new Map<number, number[]>([[1001, [1, 3]], [1007, [1, 2, 3]], [1012, [1]], [1019, [1, 4]], [1024, [1, 2]], [1003, [1]]]);

const statuses = [{ status_id: 1, name: "not_in_cart" }, { status_id: 2, name: "in_cart" }, { status_id: 3, name: "not_found" }];

type Entry = { item_in_list_id: number; item_id: number; shopping_list_id: number; buyer_id: number | null; quantity: number; discount_price: number | null; status_id: number };
const daysAgo = (days: number) => new Date(Date.UTC(2026, 9, 28 - days, 18, 30)).toISOString();
const lists = [
  { shopping_list_id: 10, location_id: 1, paid: false, completed_at: null as string | null },
  { shopping_list_id: 9, location_id: 1, paid: true, completed_at: daysAgo(6) },
  { shopping_list_id: 8, location_id: 1, paid: true, completed_at: daysAgo(13) },
  { shopping_list_id: 7, location_id: 1, paid: true, completed_at: daysAgo(21) },
  { shopping_list_id: 6, location_id: 1, paid: true, completed_at: daysAgo(30) },
  { shopping_list_id: 20, location_id: 2, paid: false, completed_at: null },
  { shopping_list_id: 30, location_id: 3, paid: false, completed_at: null },
  { shopping_list_id: 40, location_id: 4, paid: false, completed_at: null },
];
let nextEntry = 1;
const entry = (listId: number, product: number, buyer: number | null, quantity = 1, status = 1, discount: number | null = null): Entry =>
  ({ item_in_list_id: nextEntry++, item_id: listLocation(listId) * 1000 + product, shopping_list_id: listId, buyer_id: buyer, quantity, discount_price: discount, status_id: status });
function listLocation(listId: number) { return lists.find(l => l.shopping_list_id === listId)!.location_id; }
const entries: Entry[] = [
  entry(10, 1, 1, 6), entry(10, 7, 5, 2), entry(10, 8, 5, 1, 2), entry(10, 12, 3, 1), entry(10, 3, 2, 3),
  entry(10, 20, 2, 2, 1, 599), entry(10, 24, 1, 2), entry(10, 10, 4, 1, 2), entry(10, 19, 4, 1), entry(10, 26, 5, 1), entry(10, 28, null, 2),
  entry(9, 1, 1, 6, 2), entry(9, 7, 5, 2, 2), entry(9, 5, 3, 2, 2), entry(9, 15, 2, 3, 2), entry(9, 21, 2, 1, 2), entry(9, 17, 1, 1, 2), entry(9, 27, 5, 1, 2), entry(9, 28, null, 1, 2),
  entry(8, 2, 3, 1, 2), entry(8, 9, 1, 2, 2), entry(8, 13, 4, 1, 2), entry(8, 22, 2, 1, 2), entry(8, 18, 5, 1, 2),
  entry(7, 4, 3, 1, 2), entry(7, 11, 5, 1, 2), entry(7, 16, 4, 1, 2), entry(7, 23, 2, 2, 2), entry(7, 25, 1, 1, 2), entry(7, 6, 3, 1, 2),
  entry(6, 1, 1, 6, 2), entry(6, 14, 3, 1, 2), entry(6, 20, 2, 2, 2),
  entry(20, 6, 3, 2), entry(20, 9, 1, 1), entry(20, 16, 4, 1),
  entry(30, 23, 2, 2), entry(30, 25, 1, 1),
];

function flatten(e: Entry) {
  const item = itemById.get(e.item_id)!;
  const section = sections.find(s => s.section_id === item.section_id);
  const { shopping_list_id: _, ...rest } = e;
  return {
    ...rest, regular_price: item.price, status_name: statuses.find(s => s.status_id === e.status_id)?.name,
    buyer_name: buyers.find(b => b.user_id === e.buyer_id)?.name ?? null, item_name: item.name, image_path: item.image_path,
    section_id: section?.section_id, section_name: section?.name ?? null, sort_order: section?.sort_order ?? null,
  };
}
const plainItem = ({ price: _p, emoji: _e, bg: _b, ...item }: Item) => item;

function itemSvg(item: Item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
<rect width="256" height="256" rx="40" fill="${item.bg}"/>
<text x="128" y="150" font-size="132" text-anchor="middle" dominant-baseline="middle" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${item.emoji}</text>
</svg>`;
}

function route(method: string, path: string, query: URLSearchParams): unknown {
  let m: RegExpMatchArray | null;
  if (path === "/profiles") return profiles;
  if (path === "/locations") return locations;
  if ((m = path.match(/^\/locations\/(\d+)\/sections$/))) return sections.filter(s => s.location_id === Number(m![1]));
  if ((m = path.match(/^\/locations\/(\d+)$/))) return locations.find(l => l.location_id === Number(m![1])) ?? null;
  if (path === "/images") return items.map(({ item_id, image_path }) => ({ item_id, image_path }));
  if (path === "/shoppingList/active" || path === "/shoppingList/active/") {
    const list = lists.find(l => l.location_id === Number(query.get("location_id")) && !l.completed_at);
    return list ? entries.filter(e => e.shopping_list_id === list.shopping_list_id).map(flatten) : [];
  }
  if (path === "/catalog") {
    const locationId = Number(query.get("location_id"));
    return {
      items: items.filter(i => i.location_id === locationId).sort((a, b) => a.name.localeCompare(b.name)).map(item => ({
        ...plainItem(item), favorite_user_ids: favorites.get(item.item_id % 1000 + 1000) ?? [],
        section_name: sections.find(s => s.section_id === item.section_id)?.name ?? null, price: item.price,
      })),
      buyers: [...buyers].sort((a, b) => a.name.localeCompare(b.name)),
      sections: sections.filter(s => s.location_id === locationId), statuses,
    };
  }
  if ((m = path.match(/^\/catalog\/(\d+)$/))) {
    const item = itemById.get(Number(m[1]));
    return item && { item: plainItem(item), price: item.price, sections: sections.filter(s => s.location_id === item.location_id) };
  }
  if ((m = path.match(/^\/listEntries\/(\d+)$/))) {
    const e = entries.find(x => x.item_in_list_id === Number(m![1]));
    return e && { entry: { ...e, item: plainItem(itemById.get(e.item_id)!), shopping_list: lists.find(l => l.shopping_list_id === e.shopping_list_id) }, buyers };
  }
  if ((m = path.match(/^\/listHistory\/detail\/(\d+)$/))) {
    const list = lists.find(l => l.shopping_list_id === Number(m![1]));
    return list && { list: { ...list, location: locations.find(l => l.location_id === list.location_id) }, items: entries.filter(e => e.shopping_list_id === list.shopping_list_id).map(flatten) };
  }
  if ((m = path.match(/^\/listHistory\/(\d+)$/))) {
    return lists.filter(l => l.location_id === Number(m![1])).map(l => ({ ...l, _count: { item_in_list: entries.filter(e => e.shopping_list_id === l.shopping_list_id).length } }));
  }
  if (method !== "GET") return { ok: true };
  return undefined;
}

function send(res: ServerResponse, status: number, body: string, type: string) {
  res.statusCode = status;
  res.setHeader("Content-Type", type);
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
}

export function demoBackend(): Plugin {
  return {
    name: "grocerypro-demo-backend",
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = new URL(req.url ?? "/", "http://demo");
        const method = req.method ?? "GET";
        if (url.pathname === "/health") return send(res, 200, JSON.stringify({ status: "ok", app: "grocerypro" }), "application/json");
        if (url.pathname.startsWith("/socket.io")) return send(res, 404, "", "text/plain");
        const image = url.pathname.match(/^\/images\/items\/(\d+)\.svg$/);
        if (image) {
          const item = itemById.get(Number(image[1]));
          return item ? send(res, 200, itemSvg(item), "image/svg+xml") : send(res, 404, "", "text/plain");
        }
        if (!url.pathname.startsWith("/v1/")) return next();
        const body = route(method, url.pathname.slice(3), url.searchParams);
        if (body === undefined) return send(res, 404, JSON.stringify({ error: "Not found." }), "application/json");
        send(res, method === "POST" ? 201 : 200, JSON.stringify(body), "application/json");
      });
    },
  };
}
