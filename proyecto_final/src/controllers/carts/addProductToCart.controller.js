import { CartService } from "../../services/index.js";

const addProductToCartController = async (req, res) => {
  try {
    const cart = await CartService.addProductToCart(
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
};

export default addProductToCartController;
