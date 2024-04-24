import { Request, Response } from "express";
import { PlanetServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedRows = await PlanetServices.delete(Number(id));
    if (deletedRows > 0) {
      res.status(200).json({ message: "Planet deleted successfully" });
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
