import express from "express";
import PlanetController from "../controllers/PlanetControllers";

const PlanetRouter = express.Router();

PlanetRouter.get("/filterName", PlanetController.getAll);
PlanetRouter.get("/:id", PlanetController.getById);
PlanetRouter.get("/", PlanetController.getAll);
PlanetRouter.post("/", PlanetController.create);
PlanetRouter.put("/:id", PlanetController.update);
PlanetRouter.delete("/:id", PlanetController.delete);

export default PlanetRouter;
