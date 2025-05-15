import express from "express";
import productsController from "../controllers/product.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAll);
productsRouter.post("/", productsController.create);
productsRouter.delete("/", productsController.deleteProducts);

export default productsRouter;