import express, { Request, Response } from "express"
const router = express.Router();
import prisma from "../../prisma/db";

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) { res.status(400).send("Missing Param id"); return; }
    const itemInList = await prisma.item_in_list.findFirst({ where: { item_in_list_id: id } })
    if (!itemInList) { res.status(400).send("No Item In List found with id" + id); return; }
    res.send(itemInList);
});

export default router;