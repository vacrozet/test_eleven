import express from "express";
import {
  getController,
  createController,
  deleteController,
  updateController,
} from "../controllers/index";

const PlanetRouter = express.Router();

PlanetRouter.get("/filterName", getController);
PlanetRouter.get("/:id", getController);
PlanetRouter.get("/", getController);
PlanetRouter.post("/", createController);
PlanetRouter.put("/:id", updateController);
PlanetRouter.delete("/:id", deleteController);

export default PlanetRouter;
