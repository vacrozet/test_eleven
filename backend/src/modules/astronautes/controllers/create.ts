import { Request, Response } from "express";
import { AstronautServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, originPlanetId } = req.body;
  try {
    const [id] = await AstronautServices.create({
      firstname,
      lastname,
      originPlanetId,
    });
    res.status(201).json({
      id,
      firstname,
      lastname,
      originPlanetId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
