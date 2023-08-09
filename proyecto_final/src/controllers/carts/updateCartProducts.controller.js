import cartsService from "../../services/carts.service.js";
import { CartService } from "../../services/index.js";

const updateCartProductsController = async (req, res) => {
  try {
    const cart = await CartService.updateCartProducts(
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
};

export default updateCartProductsController;
