import express from "express";
import { z } from "zod";
import prisma from "../../prisma/db";
import { ShoppingListItemsService } from "../services/ShoppingListItemsService";
import { completeShoppingList, lockShoppingList } from "../services/CompleteShoppingList";
const router = express.Router();
const idSchema = z.coerce.number().int().positive();
const cents = z.number().int().min(0).max(2147483647).nullable();
const catalogSchema = z.object({ name: z.string().trim().min(1).max(255), section_id: z.number().int().positive().nullable(), price: cents });
const selectionSchema = z.object({ location_id: idSchema, entries: z.array(z.object({ item_id: idSchema, quantity: z.number().int().min(1).max(9999), buyer_id: z.number().int().positive().nullable() })).min(1).max(500) });
const entrySchema = z.object({ buyer_id: z.number().int().positive().nullable(), quantity: z.number().int().min(1).max(9999), discount_price: cents });
function fail(res: express.Response, message: string, status = 400) { res.status(status).json({ error: message }); }
router.get("/profiles", async (_req, res) => {
  res.json(await prisma.user.findMany({ select: { user_id: true, name: true, role: true }, orderBy: { user_id: "asc" } }));
});
const profileSelect = { user_id: true, name: true, role: true } as const;
const roleSchema = z.enum(["admin", "member", "shared"]);
/** The acting profile from X-Profile-Id, when it is an admin. Profiles have no passwords, so this guards against mistakes, not a hostile device. */
async function adminProfile(req: express.Request) {
  const id = idSchema.safeParse(req.get("X-Profile-Id"));
  if (!id.success) return null;
  const profile = await prisma.user.findUnique({ where: { user_id: id.data }, select: profileSelect });
  return profile?.role === "admin" ? profile : null;
}
router.post("/profiles", async (req, res) => {
  const parsed = z.object({ name: z.string().trim().min(1).max(40), role: roleSchema.default("member") }).safeParse(req.body);
  if (!parsed.success) { fail(res, "Enter a name up to 40 characters."); return; }
  const { name } = parsed.data;
  const profiles = await prisma.user.findMany({ select: { name: true, role: true } });
  // Anyone may create the first profile on an empty database; it becomes the admin.
  if (profiles.length && !await adminProfile(req)) { fail(res, "Only an admin can add profiles.", 403); return; }
  if (profiles.some(p => p.name?.toLocaleLowerCase() === name.toLocaleLowerCase())) { fail(res, `${name} already exists.`, 409); return; }
  const role = profiles.length ? parsed.data.role : "admin";
  res.status(201).json(await prisma.user.create({ data: { name, role }, select: profileSelect }));
});
router.delete("/profiles/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid profile."); return; }
  const admin = await adminProfile(req);
  if (!admin) { fail(res, "Only an admin can delete profiles.", 403); return; }
  if (admin.user_id === id.data) { fail(res, "You can't delete the profile you're using.", 409); return; }
  const result = await prisma.$transaction(async tx => {
    const profile = await tx.user.findUnique({ where: { user_id: id.data }, select: profileSelect });
    if (!profile) return { status: 404, error: "Profile not found." };
    // List entries stay on the list without a buyer; favourites are removed with the profile.
    await tx.item_in_list.updateMany({ where: { buyer_id: id.data }, data: { buyer_id: null } });
    await tx.item_favorite.deleteMany({ where: { user_id: id.data } });
    await tx.user.delete({ where: { user_id: id.data } });
    return { profile };
  });
  if ("error" in result) { fail(res, result.error!, result.status); return; }
  res.json(result.profile);
});
router.get("/catalog", async (req, res) => {
  const id = idSchema.safeParse(req.query.location_id);
  if (!id.success) { fail(res, "Choose a store first."); return; }
  const [items, buyers, sections, statuses] = await Promise.all([
    prisma.item.findMany({ where: { location_id: id.data }, include: { item_favorite: { select: { user_id: true } }, store_section: true, item_price_history: { orderBy: { item_price_history_id: "desc" }, take: 1 } }, orderBy: { name: "asc" } }),
    prisma.user.findMany({ select: { user_id: true, name: true, role: true }, orderBy: { name: "asc" } }),
    prisma.store_section.findMany({ where: { location_id: id.data }, orderBy: { sort_order: "asc" } }),
    prisma.item_status.findMany(),
  ]);
  res.json({ items: items.map(({ item_favorite, item_price_history, store_section, ...item }) => ({ ...item, favorite_user_ids: item_favorite.map(f => f.user_id), section_name: store_section?.name ?? null, price: item_price_history[0]?.price ?? null })), buyers, sections, statuses });
});
router.put("/catalog/:id/favorite", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  const parsed = z.object({ user_id: z.number().int().positive(), favorite: z.boolean() }).safeParse(req.body);
  if (!id.success || !parsed.success) { fail(res, "Choose a valid item and profile."); return; }
  const { user_id, favorite } = parsed.data;
  const [item, user] = await Promise.all([
    prisma.item.findUnique({ where: { item_id: id.data } }),
    prisma.user.findUnique({ where: { user_id } }),
  ]);
  if (!item || !user) { fail(res, "Item or profile not found.", 404); return; }
  if (favorite) await prisma.item_favorite.upsert({ where: { user_id_item_id: { user_id, item_id: id.data } }, create: { user_id, item_id: id.data }, update: {} });
  else await prisma.item_favorite.deleteMany({ where: { user_id, item_id: id.data } });
  res.json({ item_id: id.data, user_id, favorite });
});
router.post("/catalog", async (req, res) => {
  const parsed = catalogSchema.extend({ location_id: idSchema }).safeParse(req.body);
  if (!parsed.success) { fail(res, "Enter a name, a valid aisle and a non-negative price."); return; }
  const { price, ...data } = parsed.data;
  if (!await prisma.location.findUnique({ where: { location_id: data.location_id } })) { fail(res, "Store not found.", 404); return; }
  if (data.section_id !== null && !await prisma.store_section.findFirst({ where: { section_id: data.section_id, location_id: data.location_id } })) { fail(res, "This aisle does not belong to the store."); return; }
  const item = await prisma.$transaction(async tx => {
    const created = await tx.item.create({ data });
    if (price !== null) await tx.item_price_history.create({ data: { item_id: created.item_id, price, effective_date: new Date() } });
    return created;
  });
  res.status(201).json(item);
});
router.get("/catalog/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid item."); return; }
  const item = await prisma.item.findUnique({ where: { item_id: id.data }, include: { item_price_history: { orderBy: { item_price_history_id: "desc" }, take: 1 } } });
  if (!item) { fail(res, "Item not found.", 404); return; }
  const sections = await prisma.store_section.findMany({ where: { location_id: item.location_id }, orderBy: { sort_order: "asc" } });
  res.json({ item, price: item.item_price_history[0]?.price ?? null, sections });
});
router.patch("/catalog/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id), parsed = catalogSchema.safeParse(req.body);
  if (!id.success || !parsed.success) { fail(res, "Enter a name, a valid aisle and a non-negative price."); return; }
  const item = await prisma.item.findUnique({ where: { item_id: id.data } });
  if (!item) { fail(res, "Item not found.", 404); return; }
  const { price, ...data } = parsed.data;
  if (data.section_id !== null && !await prisma.store_section.findFirst({ where: { section_id: data.section_id, location_id: item.location_id } })) { fail(res, "This aisle does not belong to the store."); return; }
  const updated = await prisma.$transaction(async tx => {
    const ret = await tx.item.update({ where: { item_id: id.data }, data });
    const previous = await tx.item_price_history.findFirst({ where: { item_id: id.data }, orderBy: { item_price_history_id: "desc" } });
    if (price !== null && previous?.price !== price) await tx.item_price_history.create({ data: { item_id: id.data, price, effective_date: new Date() } });
    return ret;
  });
  res.json(updated);
});
router.post("/listEntries", async (req, res) => {
  const parsed = selectionSchema.safeParse(req.body);
  if (!parsed.success) { fail(res, "Select items with a whole quantity between 1 and 9999."); return; }
  const { location_id, entries } = parsed.data;
  const itemIds = [...new Set(entries.map(e => e.item_id))];
  const buyerIds = [...new Set(entries.flatMap(e => e.buyer_id === null ? [] : [e.buyer_id]))];
  const [location, items, buyers] = await Promise.all([
    prisma.location.findUnique({ where: { location_id } }),
    prisma.item.count({ where: { item_id: { in: itemIds }, location_id } }),
    prisma.user.count({ where: { user_id: { in: buyerIds } } }),
  ]);
  if (!location || items !== itemIds.length || buyers !== buyerIds.length || itemIds.length !== entries.length) { fail(res, "Some selected items or buyers are no longer available. Refresh and try again."); return; }
  const result = await prisma.$transaction(async tx => {
    let list = await tx.shopping_list.findFirst({ where: { location_id, completed_at: null }, orderBy: { shopping_list_id: "desc" } });
    if (list) {
      await lockShoppingList(tx, list.shopping_list_id);
      list = await tx.shopping_list.findFirst({ where: { shopping_list_id: list.shopping_list_id, completed_at: null } });
    }
    if (!list) list = await tx.shopping_list.create({ data: { location_id } });
    const status = await tx.item_status.findUnique({ where: { name: "not_in_cart" } });
    for (const entry of entries) {
      const existing = await tx.item_in_list.findFirst({ where: { shopping_list_id: list.shopping_list_id, item_id: entry.item_id, buyer_id: entry.buyer_id } });
      if (existing) {
        if ((existing.quantity ?? 0) + entry.quantity > 9999) throw new Error("Quantity limit exceeded.");
        await tx.item_in_list.update({ where: { item_in_list_id: existing.item_in_list_id }, data: { quantity: (existing.quantity ?? 0) + entry.quantity } });
      } else await tx.item_in_list.create({ data: { ...entry, shopping_list_id: list.shopping_list_id, status_id: status?.status_id ?? null } });
    }
    return { shopping_list_id: list.shopping_list_id };
  });
  res.status(201).json(result);
});
router.get("/listEntries/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid list item."); return; }
  const entry = await prisma.item_in_list.findUnique({ where: { item_in_list_id: id.data }, include: { item: true, shopping_list: true } });
  if (!entry) { fail(res, "This item is no longer on the list.", 404); return; }
  const buyers = await prisma.user.findMany({ select: { user_id: true, name: true, role: true }, orderBy: { name: "asc" } });
  res.json({ entry, buyers });
});
router.patch("/listEntries/:id/status", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid list item."); return; }
  const entry = await prisma.item_in_list.findUnique({ where: { item_in_list_id: id.data }, include: { shopping_list: true, item_status: true } });
  if (!entry) { fail(res, "This item is no longer on the list.", 404); return; }
  if (entry.shopping_list?.completed_at) { fail(res, "Completed lists cannot be changed.", 409); return; }
  if (entry.shopping_list_id === null) { fail(res, "List not found.", 404); return; }
  const updated = await prisma.$transaction(async tx => {
    await lockShoppingList(tx, entry.shopping_list_id!);
    const current = await tx.item_in_list.findUniqueOrThrow({ where: { item_in_list_id: id.data }, include: { shopping_list: true, item_status: true } });
    if (current.shopping_list?.completed_at) return null;
    const nextStatus = current.item_status?.name === "in_cart" ? "not_in_cart" : "in_cart";
    const status = await tx.item_status.findUniqueOrThrow({ where: { name: nextStatus } });
    const result = await tx.item_in_list.update({ where: { item_in_list_id: id.data }, data: { status_id: status.status_id } });
    await completeShoppingList(tx, entry.shopping_list_id!);
    return result;
  });
  if (!updated) { fail(res, "Completed lists cannot be changed.", 409); return; }
  res.json(updated);
});
router.patch("/listEntries/:id/aisle", async (req, res) => {
  const id = idSchema.safeParse(req.params.id), parsed = z.object({ section_id: idSchema.nullable() }).safeParse(req.body);
  if (!id.success || !parsed.success) { fail(res, "Choose a valid aisle."); return; }
  const entry = await prisma.item_in_list.findUnique({ where: { item_in_list_id: id.data }, include: { shopping_list: true, item: true } });
  if (!entry || !entry.item) { fail(res, "This item is no longer on the list.", 404); return; }
  if (entry.shopping_list?.completed_at) { fail(res, "Completed lists cannot be changed.", 409); return; }
  if (parsed.data.section_id !== null && !await prisma.store_section.findFirst({ where: { section_id: parsed.data.section_id, location_id: entry.item.location_id } })) { fail(res, "This aisle does not belong to the store."); return; }
  res.json(await prisma.item.update({ where: { item_id: entry.item.item_id }, data: { section_id: parsed.data.section_id } }));
});
router.patch("/listEntries/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id), parsed = entrySchema.safeParse(req.body);
  if (!id.success || !parsed.success) { fail(res, "Enter a whole quantity between 1 and 9999 and a valid price."); return; }
  const entry = await prisma.item_in_list.findUnique({ where: { item_in_list_id: id.data }, include: { shopping_list: true } });
  if (!entry) { fail(res, "This item is no longer on the list.", 404); return; }
  if (entry.shopping_list?.completed_at) { fail(res, "Completed lists cannot be changed.", 409); return; }
  if (parsed.data.buyer_id !== null && !await prisma.user.findUnique({ where: { user_id: parsed.data.buyer_id } })) { fail(res, "Buyer not found."); return; }
  const updated = await prisma.$transaction(async tx => {
    if (parsed.data.discount_price !== null) {
      const current = await tx.item_in_list.findUnique({ where: { item_in_list_id: id.data }, select: { item_id: true } });
      if (current?.item_id != null) {
        const regularPrice = await tx.item_price_history.findFirst({
          where: { item_id: current.item_id }, orderBy: { item_price_history_id: "desc" },
        });
        if (regularPrice?.price == null) {
          await tx.item_price_history.create({ data: { item_id: current.item_id, price: parsed.data.discount_price, effective_date: new Date() } });
        }
      }
    }
    return tx.item_in_list.update({ where: { item_in_list_id: id.data }, data: parsed.data });
  });
  res.json(updated);
});
router.delete("/listEntries/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid list item."); return; }
  const entry = await prisma.item_in_list.findUnique({ where: { item_in_list_id: id.data }, include: { shopping_list: true } });
  if (!entry) { fail(res, "This item is no longer on the list.", 404); return; }
  if (entry.shopping_list?.completed_at) { fail(res, "Completed lists cannot be changed.", 409); return; }
  await prisma.item_in_list.delete({ where: { item_in_list_id: id.data } }); res.sendStatus(204);
});
router.get("/listHistory/:locationId", async (req, res) => {
  const id = idSchema.safeParse(req.params.locationId);
  if (!id.success) { fail(res, "Invalid store."); return; }
  res.json(await prisma.shopping_list.findMany({ where: { location_id: id.data, completed_at: { not: null } }, include: { _count: { select: { item_in_list: true } } }, orderBy: { completed_at: "desc" } }));
});
router.get("/listHistory/detail/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid list."); return; }
  const list = await prisma.shopping_list.findUnique({ where: { shopping_list_id: id.data }, include: { location: true } });
  if (!list) { fail(res, "List not found.", 404); return; }
  const items = await ShoppingListItemsService(id.data, list.completed_at);
  res.json({ list, items });
});
export default router;
