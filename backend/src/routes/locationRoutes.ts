import express, { Request, Response } from "express";
import { z } from "zod";
const router = express.Router();
import prisma from "../../prisma/db";
import { deleteItemImage } from "../services/ItemImages";

const idSchema = z.coerce.number().int().positive();
const aisleSchema = z.object({ name: z.string().trim().min(1).max(255) });

router.get("/:id/sections", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) { res.status(400).json({ error: "Invalid store." }); return; }
  res.json(await prisma.store_section.findMany({ where: { location_id: id.data }, orderBy: [{ sort_order: "asc" }, { section_id: "asc" }] }));
});

router.post("/:id/sections", async (req, res) => {
  const id = idSchema.safeParse(req.params.id), parsed = aisleSchema.safeParse(req.body);
  if (!id.success || !parsed.success) { res.status(400).json({ error: "Enter an aisle name." }); return; }
  if (!await prisma.location.findUnique({ where: { location_id: id.data } })) { res.status(404).json({ error: "Store not found." }); return; }
  const duplicate = await prisma.store_section.findFirst({ where: { location_id: id.data, name: { equals: parsed.data.name } } });
  if (duplicate) { res.status(409).json({ error: "That aisle already exists." }); return; }
  const sort = await prisma.store_section.aggregate({ where: { location_id: id.data }, _max: { sort_order: true } });
  res.status(201).json(await prisma.store_section.create({ data: { location_id: id.data, name: parsed.data.name, sort_order: (sort._max.sort_order ?? 0) + 1 } }));
});

router.get("/", async (req: Request, res: Response) => {
  const data = await prisma.location.findMany();
  res.send(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const location_id = req.params.id;
    const data = await prisma.location.findUnique({ where: { location_id: Number(location_id) } });
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get location' });
    console.error('Error creating location:', error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const location = req.body;

    const locationReturn = await prisma.location.create({
      data: location
    });
    res.status(201).json(locationReturn);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location' });
    console.error('Error creating location:', error);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const location_id = req.params.id;
    const { location_id: _, ...location } = req.body;
    const data = await prisma.location.update({
      where: { location_id: Number(location_id) },
      data: location
    });
    res.status(200).send(data);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});



router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const location_id = req.params.id;
    const images = await prisma.item.findMany({ where: { location_id: Number(location_id), image_path: { not: null } }, select: { image_path: true } });
    await prisma.location.delete({
      where: { location_id: Number(location_id) }
    });
    await Promise.all(images.map(item => deleteItemImage(item.image_path)));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ error: 'Failed to delete location' });
  }
})

export default router;
