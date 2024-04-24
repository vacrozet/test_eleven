import { Request, Response } from "express";
import { AstronautServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstname, lastname, originPlanetId } = req.body;
  try {
    const updatedRows = await AstronautServices.update({
      id: Number(id),
      firstname,
      lastname,
      originPlanetId,
    });
    if (updatedRows > 0) {
      res.status(200).json({ message: "Astronaut updated successfully" });
    } else {
      res.status(404).json({ error: "Astronaut not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
