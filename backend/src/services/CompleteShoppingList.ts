import type { Prisma } from "../../../shared/prisma-types";

/** Caller holds the shopping-list row lock before changing or completing it. */
export async function completeShoppingList(tx: Prisma.TransactionClient, listId: number) {
  const list = await tx.shopping_list.findUniqueOrThrow({ where: { shopping_list_id: listId } });
  if (list.completed_at) return list;
  const entries = await tx.item_in_list.findMany({ where: { shopping_list_id: listId }, include: { item_status: true } });
  if (!entries.length || entries.some(entry => entry.item_status?.name !== "in_cart")) return null;
  return tx.shopping_list.update({ where: { shopping_list_id: listId }, data: { completed_at: new Date(), paid: true } });
}

export async function lockShoppingList(tx: Prisma.TransactionClient, listId: number) {
  await tx.$queryRaw`SELECT shopping_list_id FROM shopping_list WHERE shopping_list_id = ${listId} FOR UPDATE`;
}
