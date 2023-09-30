import { CartService } from "../../services/index.js";

const addProductToCartController = async (req, res, next) => {
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
    next(error);
  }
};

export default addProductToCartController;
