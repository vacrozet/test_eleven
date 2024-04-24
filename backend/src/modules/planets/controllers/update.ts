import { Request, Response } from "express";
import { PlanetServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, isHabitable, imageId } = req.body;
  try {
    const updatedRows = await PlanetServices.update({
      id: Number(id),
      name,
      isHabitable,
      imageId,
    });
    if (updatedRows > 0) {
      res.status(200).json({ message: "Planet updated successfully" });
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
