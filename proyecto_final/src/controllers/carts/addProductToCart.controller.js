import cartsService from "../../services/carts.service.js";

const addProductToCartController = async (req, res) => {
  try {
    const cart = await cartsService.addProductToCart(
      req.params.cid,
      req.params.pid
    );

    return res.status(201).json({
      status: "success",
      msg: "Product added to cart",
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

export default addProductToCartController;
