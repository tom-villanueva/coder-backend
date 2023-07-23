import cartsService from "../../services/carts.service.js";

const createCartController = async (req, res) => {
  try {
    const cart = await cartsService.createCart();

    return res.status(201).json({
      status: "success",
      msg: "Cart created",
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

export default createCartController;
