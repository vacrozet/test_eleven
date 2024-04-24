import { Request, Response } from "express";
import { ImageServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, path } = req.body;
  try {
    const updatedRows = await ImageServices.update({
      id: Number(id),
      name,
      path,
    });
    if (updatedRows > 0) {
      res.status(200).json({ message: "Image updated successfully" });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
