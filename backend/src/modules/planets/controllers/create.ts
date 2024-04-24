import { Request, Response } from "express";
import { PlanetServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { name, isHabitable, imageId } = req.body;
  try {
    const id = await PlanetServices.create({ name, isHabitable, imageId });
    res.status(201).json({
      id,
      name,
      isHabitable,
      imageId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
