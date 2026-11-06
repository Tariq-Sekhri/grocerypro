import express, { Request, Response } from "express";
const router = express.Router();
import prisma from "../../prisma/db";
import { deleteItemImage } from "../services/ItemImages";

router.get("/:id", async (req: Request, res: Response) => {
    const itemId = Number(req.params.id);
    if (!itemId) {
        res.status(400).send("item id parameter is required")
        return;
    }
    const item = await prisma.item.findFirstOrThrow({ where: { item_id: itemId } })
    res.send(item);
})

router.post("/", async (req: Request, res: Response) => {
    const { item_id: _, image_path: _image, ...data } = req.body
    if (!data.name) {
        res.status(400).send("missing required field item name");
        return;
    }
    const new_item = await prisma.item.create({
        data: data
    })
    res.send(new_item);
});

router.patch("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) { res.status(400).send("missing required field: id"); return; }
    const { item_id: _, image_path: _image, ...body } = req.body
    const updated_item = await prisma.item.update({ where: { item_id: id }, data: { ...body } })
    res.send(updated_item);
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) { res.status(400).send("missing required field: id"); return; }
    const deleted = await prisma.item.delete({ where: { item_id: id } })
    await deleteItemImage(deleted.image_path);
    res.status(204).send();
});

export default router;
