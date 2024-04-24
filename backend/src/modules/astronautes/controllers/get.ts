import { Request, Response } from "express";
import { AstronautServices } from "../services/index";

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (id) {
      const data = await AstronautServices.getById(Number(id));
      if (data) {
        res.status(200).json({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          originPlanet: {
            name: data.name,
            isHabitable: data.isHabitable,
            description: data.description,
            image: {
              path: data.path,
              name: data.imageName,
            },
          },
        });
      } else {
        res.status(404).json({ error: "Astronaut not found" });
      }
    }

    const astronauts = await AstronautServices.get();
    res.status(200).json(astronauts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
