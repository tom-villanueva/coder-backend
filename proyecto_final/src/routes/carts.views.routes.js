import express from "express";
import renderCartController from "../controllers/carts/renderCart.controller.js";
import { isCartOwner } from "../middlewares/auth.middleware.js";

const viewsCartsRouter = express.Router();

viewsCartsRouter.get("/:cid", isCartOwner, renderCartController);

export default viewsCartsRouter;
