import express from "express";
import productsService from "../../dao/services/products.service.js";

const viewsProductsRouter = express.Router();

viewsProductsRouter.get("/", async (req, res) => {
  const products = await productsService.getAllProducts();
  const context = {
    products: products.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
    })),
  };
  res.render("index", { products: context.products });
});

export default viewsProductsRouter;
