import { CartService } from "../../services/index.js";

const getCartProductsController = async (req, res, next) => {
  try {
    const products = await CartService.getCartProducts(req.params.cid);

    return res.status(200).json({
      status: "success",
      msg: "Products of cart",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export default getCartProductsController;
