import { Request, Response } from "express";
import { PlanetServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  const filterName = <string>req.query?.name;

  const { id } = req.params;
  try {
    if (id) {
      const planet = await PlanetServices.getById(Number(id));
      if (planet) {
        res.status(200).json(planet);
      } else {
        res.status(404).json({ error: "planet not found" });
      }
    }

    const images = await PlanetServices.get({ filterName });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
