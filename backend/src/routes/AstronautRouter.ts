// src/routes/AstronautRouter.ts
import express from "express";
import AstronautsController from "../controllers/AstronautControllers";

const AstronautRouter = express.Router();

AstronautRouter.get("/", AstronautsController.getAll);
AstronautRouter.get("/:id", AstronautsController.getById);
AstronautRouter.post("/", AstronautsController.create);
AstronautRouter.put("/:id", AstronautsController.update);
AstronautRouter.delete("/:id", AstronautsController.delete);

export default AstronautRouter;
