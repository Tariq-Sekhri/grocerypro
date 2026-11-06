import express, { Request, Response } from "express";
const router = express.Router();
import prisma from "../../prisma/db";
import { GetActiveShoppingListId } from "../services/GetActiveShoppingListId";
import { ShoppingListItemsService } from "../services/ShoppingListItemsService";
router.get("/shoppingList/active/", async (req: Request, res: Response) => {
  const locationId: number = Number(req.query.location_id);
  if (!locationId) { res.status(400).send("location_id query parameter is required"); return; }
  const activeShoppingListId = await GetActiveShoppingListId(locationId);
  const shoppingListItems = await ShoppingListItemsService(activeShoppingListId);
  res.send(shoppingListItems);
});

router.get("/AddItemToList", async (req: Request, res: Response) => {
  const locationId: number = Number(req.query.location_id);
  if (!locationId) { res.status(400).send("location_id query parameter is required"); return; }
  const items = await prisma.item.findMany({ where: { location_id: locationId }, select: { item_id: true, image_path: true, name: true, location_id: true } });
  const buyers = await prisma.user.findMany({ select: { user_id: true, name: true, role: true } });
  res.send({ items, buyers });
});

router.get("/EditItem/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) { res.status(400).send("item id requried"); return; }
  const item = await prisma.item.findFirst({ where: { item_id: id }, include: { store_section: true } });
  if (!item) { res.status(400).send(`item with id:${id} does not exist`); return; }
  const currentPrice = await prisma.item_price_history.findFirst({ where: { item_id: id }, orderBy: { item_price_history_id: "desc" }, select: { price: true } })
  const store_sections = await prisma.store_section.findMany();
  res.send({ item, currentPrice, store_sections })
});

router.get("/OldList/:location_id", async (req: Request, res: Response) => {
  const location_id = Number(req.params.location_id)
  if (!location_id) { res.status(400).send("location id requried"); return; }
  const oldLists = await prisma.shopping_list.findMany({ where: { location_id: location_id }, orderBy: { shopping_list_id: "desc" } })
  res.send(oldLists);
});

export default router;
