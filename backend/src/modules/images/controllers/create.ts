import { Request, Response } from "express";
import { ImageServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { name, path } = req.body;
  try {
    const id = await ImageServices.create({ name, path });
    res.status(201).json({ id, name, path });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
