import { Request, Response } from "express";
import Planet from "../entities/Planet";
import PlanetServices from "../services/PlanetServices";
import knex from "../db";

const PlanetController = {
  getAll: async (req: Request, res: Response): Promise<Planet[] | void> => {
    const filterName = <string>req.query?.name;

    try {
      const planets = await PlanetServices.get({ filterName });
      res.status(200).json(planets);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await PlanetServices.getById(Number(id));

      if (data) {
        res.status(200).json({
          id: data.id,
          name: data.name,
          isHabitable: data.isHabitable,
          description: data.description,
          image: {
            path: data.path,
            name: data.imageName,
          },
        });
      } else {
        res.status(404).json({ error: "Planet not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
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
  },

  update: async (req: Request, res: Response): Promise<void> => {
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
  },

  delete: async (req: Request, res: Response): Promise<void> => {
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
  },
};

export default PlanetController;
