import express from "express";
import {
  getController,
  createController,
  deleteController,
  updateController,
} from "../controllers/index";

const ImageRouter = express.Router();

ImageRouter.get("/", getController);
ImageRouter.get("/:id", getController);
ImageRouter.post("/", createController);
ImageRouter.put("/:id", updateController);
ImageRouter.delete("/:id", deleteController);

export default ImageRouter;
