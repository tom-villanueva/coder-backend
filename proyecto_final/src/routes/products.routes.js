import express from "express";
import getAllProductsController from "../controllers/products/getAllProducts.controller.js";
import getProductByIdController from "../controllers/products/getProductById.controller.js";
import createProductController from "../controllers/products/createProduct.controller.js";
import updateProductController from "../controllers/products/updateProduct.controller.js";
import deleteProductController from "../controllers/products/deleteProduct.controller.js";
import {
  canCreateProduct,
  canDeleteProduct,
  isAdmin,
} from "../middlewares/auth.middleware.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProductsController);
productsRouter.get("/:pid", getProductByIdController);
productsRouter.post("/", canCreateProduct, createProductController);
productsRouter.put("/:pid", isAdmin, updateProductController);
productsRouter.delete("/:pid", canDeleteProduct, deleteProductController);

export default productsRouter;
