import { item_in_list } from "@shared/prisma-types";

export type FlattenedShoppingListItem = Omit<item_in_list, "shopping_list_id"> & {
    regular_price?: number | null,
    status_name: string | null | undefined,
    buyer_name: string | null | undefined,
    item_name: string | null | undefined,
    image_path: string | null | undefined,
    section_id: number | undefined,
    section_name: string | null | undefined,
    sort_order: number | null | undefined,
}

export default FlattenedShoppingListItem;