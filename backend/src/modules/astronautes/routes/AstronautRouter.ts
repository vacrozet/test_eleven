// src/routes/AstronautRouter.ts
import express from "express";
import {
  getController,
  createController,
  updateController,
  deleteController,
} from "../controllers";

const AstronautsRouter = express.Router();

AstronautsRouter.get("/", getController);
AstronautsRouter.get("/:id", getController);
AstronautsRouter.post("/", createController);
AstronautsRouter.put("/:id", updateController);
AstronautsRouter.delete("/:id", deleteController);

export default AstronautsRouter;
