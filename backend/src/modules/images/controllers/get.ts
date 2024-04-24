import { Request, Response } from "express";
import { ImageServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    if (id) {
      const image = await ImageServices.getById(Number(id));
      if (image) {
        res.status(200).json(image);
      } else {
        res.status(404).json({ error: "image not found" });
      }
    }

    const images = await ImageServices.get();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
