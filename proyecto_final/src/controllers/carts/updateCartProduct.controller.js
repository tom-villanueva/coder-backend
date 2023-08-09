import { CartService } from "../../services/index.js";

const updateCartProductController = async (req, res) => {
  try {
    const cart = await CartService.updateCartProduct(
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
};

export default updateCartProductController;