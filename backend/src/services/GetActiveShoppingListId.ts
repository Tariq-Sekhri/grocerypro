import prisma from "../../prisma/db";

export const GetActiveShoppingListId = async (location_id: number): Promise<number> => {
  const shoppingList = await prisma.shopping_list.findFirst({
    where: { location_id, completed_at: null },
    orderBy: { shopping_list_id: 'desc' }
  });

  if (shoppingList == null) {
    const newShopingList = await prisma.shopping_list.create({ data: { location_id } });
    return newShopingList.shopping_list_id;
  }
  return shoppingList.shopping_list_id;

};
