import express from "express";
import { z } from "zod";
import prisma from "../../prisma/db";
import { deleteItemImage, MAX_IMAGE_BYTES, pruneItemImages, saveItemImage } from "../services/ItemImages";
const router = express.Router();
const idSchema = z.coerce.number().int().positive();
function fail(res: express.Response, message: string, status = 400) { res.status(status).json({ error: message }); }

/** Every item image, so devices can download new ones and drop replaced ones. */
router.get("/images", async (_req, res) => {
  res.json(await prisma.item.findMany({ where: { image_path: { not: null } }, select: { item_id: true, image_path: true } }));
});

const rawImage = express.raw({ type: ["image/jpeg", "image/png", "image/webp"], limit: MAX_IMAGE_BYTES });
router.put("/catalog/:id/image", rawImage, async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid item."); return; }
  if (!Buffer.isBuffer(req.body) || !req.body.length) { fail(res, "Upload a JPEG, PNG or WebP image.", 415); return; }
  const item = await prisma.item.findUnique({ where: { item_id: id.data } });
  if (!item) { fail(res, "Item not found.", 404); return; }
  const imagePath = await saveItemImage(id.data, req.body);
  if (!imagePath) { fail(res, "Upload a JPEG, PNG or WebP image.", 415); return; }
  const updated = await prisma.item.update({ where: { item_id: id.data }, data: { image_path: imagePath } });
  if (item.image_path !== imagePath) await deleteItemImage(item.image_path);
  res.json(updated);
});

router.delete("/catalog/:id/image", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { fail(res, "Invalid item."); return; }
  const item = await prisma.item.findUnique({ where: { item_id: id.data } });
  if (!item) { fail(res, "Item not found.", 404); return; }
  const updated = await prisma.item.update({ where: { item_id: id.data }, data: { image_path: null } });
  await deleteItemImage(item.image_path);
  res.json(updated);
});

export async function pruneUnusedItemImages() {
  const items = await prisma.item.findMany({ where: { image_path: { not: null } }, select: { image_path: true } });
  await pruneItemImages(items.map(item => item.image_path));
}

export default router;
