import express from "express";
import productsService from "../../dao/services/products.service.js";

const viewsProductsRouter = express.Router();

viewsProductsRouter.get("/", async (req, res) => {
  const products = await productsService.getAllProducts(req.query);
  const context = {
    ...products,
    docs: products.docs.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
    })),
    ...req.query,
    user: {
      ...req.session,
    },
  };

  res.render("products", context);
});

viewsProductsRouter.get("/:pid", async (req, res) => {
  const product = await productsService.getProductById(req.params.pid);
  const context = {
    product: {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      stock: product.stock,
      price: product.price,
    },
  };

  res.render("productDetail", context);
});

export default viewsProductsRouter;
