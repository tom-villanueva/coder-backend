import express from "express";
import renderCartController from "../controllers/carts/renderCart.controller.js";
import { isCartOwner } from "../middlewares/auth.middleware.js";
import renderPurchaseSuccessController from "../controllers/carts/renderPurchaseSuccess.controller.js";

const viewsCartsRouter = express.Router();

viewsCartsRouter.get("/purchase-success", renderPurchaseSuccessController);
viewsCartsRouter.get("/:cid", isCartOwner, renderCartController);

export default viewsCartsRouter;
