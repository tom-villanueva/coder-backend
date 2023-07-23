import express from "express";
import renderCartController from "../controllers/carts/renderCart.controller.js";

const viewsCartsRouter = express.Router();

viewsCartsRouter.get("/:cid", renderCartController);

export default viewsCartsRouter;
