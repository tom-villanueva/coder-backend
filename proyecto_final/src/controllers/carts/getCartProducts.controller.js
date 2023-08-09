import { CartService } from "../../services/index.js";

const getCartProductsController = async (req, res) => {
  try {
    const products = await CartService.getCartProducts(req.params.cid);

    return res.status(201).json({
      status: "success",
      msg: "Products of cart",
      data: products,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};

export default getCartProductsController;
