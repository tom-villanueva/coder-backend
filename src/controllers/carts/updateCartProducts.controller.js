import cartsService from "../../services/carts.service.js";
import { CartService } from "../../services/index.js";

const updateCartProductsController = async (req, res, next) => {
  try {
    const cart = await CartService.updateCartProducts(
      req.params.cid,
      req.body.products
    );

    return res.status(201).json({
      status: "success",
      msg: "Products added to cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export default updateCartProductsController;
