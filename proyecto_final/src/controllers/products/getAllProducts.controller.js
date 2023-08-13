import { ProductService } from "../../services/index.js";

const getAllProductsController = async (req, res, next) => {
  try {
    const paginatedProducts = await ProductService.getAllProducts(req.query);

    return res.status(200).json({
      status: "success",
      msg: "Products list",
      ...paginatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllProductsController;
