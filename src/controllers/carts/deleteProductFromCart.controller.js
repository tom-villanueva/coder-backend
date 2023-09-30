import { CartService } from "../../services/index.js";

const deleteProductFromCartController = async (req, res, next) => {
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
    next(error);
  }
};

export default deleteProductFromCartController;
