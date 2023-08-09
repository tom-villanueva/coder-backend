import { CartService } from "../../services/index.js";

const createCartController = async (req, res) => {
  try {
    const cart = await CartService.createCart();

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
};

export default createCartController;
