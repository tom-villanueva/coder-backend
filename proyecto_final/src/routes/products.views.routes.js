import express from "express";
import renderProductsController from "../controllers/products/renderProducts.controller.js";
import renderProductDetailController from "../controllers/products/renderProductDetail.controller.js";

const viewsProductsRouter = express.Router();

viewsProductsRouter.get("/", renderProductsController);
viewsProductsRouter.get("/:pid", renderProductDetailController);

export default viewsProductsRouter;
