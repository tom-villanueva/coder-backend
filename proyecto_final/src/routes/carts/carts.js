import express from "express";
// import CartManager from "../../dao/cart/CartManager.js";
// import ProductManager from "../../dao/product/ProductManager.js";
import cartsService from "../../dao/services/carts.service.js";
import productsService from "../../dao/services/products.service.js";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    // const cart = await CartManager.addCart();
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
    // const product = await ProductManager.getProductById(Number(req.params.pid));
    const product = await productsService.getProductById(req.params.pid);

    // const cart = await CartManager.addProductToCart(
    //   Number(req.params.cid),
    //   product
    // );

    const cart = await cartsService.addProductToCart(req.params.cid, product);

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
    // const productos = await CartManager.getCartProducts(Number(req.params.cid));
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

export default cartRouter;
