import cartsService from "../../services/carts.service.js";

const getCartProductsController = async (req, res) => {
  try {
    const products = await cartsService.getCartProducts(req.params.cid);

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
