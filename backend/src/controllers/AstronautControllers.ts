import { Request, Response } from "express";
import AstronautsServices from "../services/AstronautServices";

export default {
  getAll: async (req: Request, res: Response): Promise<void> => {
    const pageSize = Number(req.query?.pageSize) || 10;
    const pageNumber = Number(req.query?.pageNumber) || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    try {
      const astronauts = await AstronautsServices.get({ pageSize, startIndex });

      res.status(200).json(astronauts);
    } catch (error) {
      console.log({ error });
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await AstronautsServices.getById(Number(id));
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const [id] = await AstronautsServices.create({
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
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const updatedRows = await AstronautsServices.update({
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
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await AstronautsServices.delete(Number(id));
      if (deletedRows > 0) {
        res.status(200).json({ message: "Astronaut deleted successfully" });
      } else {
        res.status(404).json({ error: "Astronaut not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
