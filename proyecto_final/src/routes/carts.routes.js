import express from "express";
import getAllCartsController from "../controllers/carts/getAllCarts.controller.js";
import createCartController from "../controllers/carts/createCart.controller.js";
import addProductToCartController from "../controllers/carts/addProductToCart.controller.js";
import getCartProductsController from "../controllers/carts/getCartProducts.controller.js";
import deleteProductFromCartController from "../controllers/carts/deleteProductFromCart.controller.js";
import updateCartProductsController from "../controllers/carts/updateCartProducts.controller.js";
import updateCartProductController from "../controllers/carts/updateCartProduct.controller.js";
import deleteCartProductsController from "../controllers/carts/deleteCartProducts.controller.js";
import { isCartOwner } from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.get("/", getAllCartsController);
cartRouter.post("/", createCartController);
cartRouter.get("/:cid", getCartProductsController);
cartRouter.put("/:cid", updateCartProductsController);
cartRouter.delete("/:cid", deleteCartProductsController);
cartRouter.post("/:cid/product/:pid", isCartOwner, addProductToCartController);
cartRouter.put("/:cid/products/:pid", isCartOwner, updateCartProductController);
cartRouter.delete(
  "/:cid/product/:pid",
  isCartOwner,
  deleteProductFromCartController
);

export default cartRouter;
