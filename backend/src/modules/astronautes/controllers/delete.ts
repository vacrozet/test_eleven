import { Request, Response } from "express";
import { AstronautServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedRows = await AstronautServices.delete(Number(id));
    if (deletedRows > 0) {
      res.status(200).json({ message: "Astronaut deleted successfully" });
    } else {
      res.status(404).json({ error: "Astronaut not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
