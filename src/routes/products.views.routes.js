import express from "express";
import renderProductsController from "../controllers/products/renderProducts.controller.js";
import renderProductDetailController from "../controllers/products/renderProductDetail.controller.js";
import renderProductsAdminController from "../controllers/products/renderProductsAdmin.controller.js";
import { canCreateProduct } from "../middlewares/auth.middleware.js";

const viewsProductsRouter = express.Router();

viewsProductsRouter.get("/", renderProductsController);
viewsProductsRouter.get(
  "/admin",
  canCreateProduct,
  renderProductsAdminController
);
viewsProductsRouter.get("/:pid", renderProductDetailController);

export default viewsProductsRouter;
