import express from "express";
import productsService from "../../dao/services/products.service.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const paginatedProducts = await productsService.getAllProducts(req.query);

    return res.status(200).json({
      status: "success",
      msg: "Products list",
      ...paginatedProducts,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.pid);
    return res.status(200).json({
      status: "success",
      msg: "Product found",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const product = await productsService.createProduct(req.body);

    return res.status(201).json({
      status: "success",
      msg: "Product created",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const product = await productsService.updateProduct(
      req.params.pid,
      req.body
    );

    return res.status(201).json({
      status: "success",
      msg: "Product updated",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const product = await productsService.deleteProduct(req.params.pid);

    return res.status(201).json({
      status: "success",
      msg: "Product deleted",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

export default productsRouter;
