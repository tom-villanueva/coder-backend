import { CartService } from "../../services/index.js";

const deleteCartProductsController = async (req, res) => {
  try {
    const cart = await CartService.deleteCartProducts(req.params.cid);

    return res.status(201).json({
      status: "success",
      msg: "Products deleted in cart",
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

export default deleteCartProductsController;
