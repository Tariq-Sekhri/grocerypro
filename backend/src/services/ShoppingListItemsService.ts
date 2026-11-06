import prisma from "../../prisma/db"
import FlattenedShoppingListItem from "@shared/types/FlattenedShoppingListItem"
import type { item_in_list } from "../../../shared/prisma-types"

export const ShoppingListItemsService = async (shoppingListId: number, completedAt: Date | null = null): Promise<FlattenedShoppingListItem[]> => {
  const shoppingListItemsRaw = await prisma.item_in_list.findMany({
    where: { shopping_list_id: shoppingListId },
    include: {
      item: {
        include: {
          item_price_history: {
            where: completedAt ? { OR: [{ effective_date: { lte: completedAt } }, { effective_date: null }] } : undefined,
            orderBy: { item_price_history_id: "desc" },
            take: 1,
          },
          store_section: true,
        }
      },
      user: true,
      item_status: true,
    }
  })

  return shoppingListItemsRaw.map(({
    item_status,
    user,
    item,
    shopping_list_id: _,
    ...rest
  }: item_in_list & {
    item_status: any;
    user: any;
    item: any;
  }) => ({
    ...rest,
    regular_price: item?.item_price_history?.[0]?.price ?? null,
    status_name: item_status?.name,
    buyer_name: user?.name,
    item_name: item?.name,
    image_path: item?.image_path,
    section_id: item?.store_section?.section_id,
    section_name: item?.store_section?.name,
    sort_order: item?.store_section?.sort_order,
  })) as FlattenedShoppingListItem[]
}