import { CartService } from "../../services/index.js";

const createCartController = async (req, res, next) => {
  try {
    const cart = await CartService.createCart();

    return res.status(201).json({
      status: "success",
      msg: "Cart created",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export default createCartController;
