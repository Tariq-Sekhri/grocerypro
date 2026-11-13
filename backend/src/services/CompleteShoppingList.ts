import type { Prisma } from "../../../shared/prisma-types";

/**
 * Archives the list once every entry is in the cart or marked not available
 * (with at least one bought). Caller holds the shopping-list row lock.
 * Not-available entries stay on the archived list as a record and are copied
 * to a new active list for the store, so they are planned for the next trip.
 */
export async function completeShoppingList(tx: Prisma.TransactionClient, listId: number) {
  const list = await tx.shopping_list.findUniqueOrThrow({ where: { shopping_list_id: listId } });
  if (list.completed_at) return list;
  const entries = await tx.item_in_list.findMany({ where: { shopping_list_id: listId }, include: { item_status: true } });
  const status = (entry: (typeof entries)[number]) => entry.item_status?.name;
  if (!entries.some(entry => status(entry) === "in_cart") || entries.some(entry => status(entry) !== "in_cart" && status(entry) !== "not_found")) return null;
  const completed = await tx.shopping_list.update({ where: { shopping_list_id: listId }, data: { completed_at: new Date(), paid: true } });
  const unavailable = entries.filter(entry => status(entry) === "not_found");
  if (unavailable.length) {
    const next = await tx.shopping_list.create({ data: { location_id: list.location_id } });
    const notInCart = await tx.item_status.findUnique({ where: { name: "not_in_cart" } });
    await tx.item_in_list.createMany({ data: unavailable.map(entry => ({
      item_id: entry.item_id, buyer_id: entry.buyer_id, quantity: entry.quantity, discount_price: entry.discount_price,
      shopping_list_id: next.shopping_list_id, status_id: notInCart?.status_id ?? null,
    })) });
  }
  return completed;
}

export async function lockShoppingList(tx: Prisma.TransactionClient, listId: number) {
  await tx.$queryRaw`SELECT shopping_list_id FROM shopping_list WHERE shopping_list_id = ${listId} FOR UPDATE`;
}
