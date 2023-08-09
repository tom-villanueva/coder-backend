import { CartService } from "../../services/index.js";

const getAllCartsController = async (req, res) => {
  try {
    const carts = await CartService.getAllCarts();

    return res.status(200).json({
      status: "success",
      msg: "Carts list",
      data: carts,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};

export default getAllCartsController;
