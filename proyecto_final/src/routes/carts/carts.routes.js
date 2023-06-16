import express from "express";
import cartsService from "../../dao/services/carts.service.js";

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getAllCarts();

    return res.status(200).json({
      status: "success",
      msg: "Carts list",
      data: carts,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const cart = await cartsService.createCart();

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
    const cart = await cartsService.addProductToCart(
      req.params.cid,
      req.params.pid
    );

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
    const products = await cartsService.getCartProducts(req.params.cid);

    return res.status(201).json({
      status: "success",
      msg: "Products of cart",
      data: products,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await cartsService.deleteProductFromCart(
      req.params.cid,
      req.params.pid
    );

    return res.status(200).json({
      status: "success",
      msg: "Product deleted from cart",
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

cartRouter.put("/:cid", async (req, res) => {
  try {
    const cart = await cartsService.updateCartProducts(
      req.params.cid,
      req.body.pids
    );

    return res.status(201).json({
      status: "success",
      msg: "Products added to cart",
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

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await cartsService.updateCartProduct(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );

    return res.status(201).json({
      status: "success",
      msg: "Products updated in cart",
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

cartRouter.delete("/:cid", async (req, res) => {
  try {
    const cart = await cartsService.deleteCartProducts(req.params.cid);

    return res.status(201).json({
      status: "success",
      msg: "Products deleted in cart",
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

export default cartRouter;
