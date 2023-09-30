import { CartService } from "../../services/index.js";

const getAllCartsController = async (req, res, next) => {
  try {
    const carts = await CartService.getAllCarts();

    return res.status(200).json({
      status: "success",
      msg: "Carts list",
      data: carts,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllCartsController;
