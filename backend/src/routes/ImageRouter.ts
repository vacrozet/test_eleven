import express from "express";
import ImageController from "../controllers/ImageControllers";

const ImageRouter = express.Router();

ImageRouter.get("/", ImageController.getAll);
ImageRouter.get("/:id", ImageController.getById);
ImageRouter.post("/", ImageController.create);
ImageRouter.put("/:id", ImageController.update);
ImageRouter.delete("/:id", ImageController.delete);

export default ImageRouter;
