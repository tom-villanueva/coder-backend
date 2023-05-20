import express from "express";
import ProductManager from "../../lib/product/ProductManager.js";

const viewsProductsRouter = express.Router();

viewsProductsRouter.get("/", async (req, res) => {
  const products = await ProductManager.getProducts();
  res.render('home', {products});
});

viewsProductsRouter.get("/realtime", async (req, res) => {
  res.render('realTimeProducts', {});
});

export default viewsProductsRouter;