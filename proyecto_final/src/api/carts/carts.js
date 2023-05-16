import express from "express";
import CartManager from "../../lib/cart/CartManager.js";
import ProductManager from "../../lib/product/ProductManager.js";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    const cart = await CartManager.addCart();

    return res.status(201).json({
      status: "success",
      msg: "Cart created",
      data: cart,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const product = await ProductManager.getProductById(Number(req.params.pid));

    const cart = await CartManager.addProductToCart(Number(req.params.cid), product);

    return res.status(201).json({
      status: "success",
      msg: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const productos = await CartManager.getCartProducts(Number(req.params.cid));

    return res.status(201).json({
      status: "success",
      msg: "Products of cart",
      data: productos,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

export default cartRouter;