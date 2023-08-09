import { CartService } from "../../services/index.js";

const deleteProductFromCartController = async (req, res) => {
  try {
    const cart = await CartService.deleteProductFromCart(
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
};

export default deleteProductFromCartController;
