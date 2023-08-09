import { ProductService } from "../../services/index.js";

const getAllProductsController = async (req, res) => {
  try {
    const paginatedProducts = await ProductService.getAllProducts(req.query);

    return res.status(200).json({
      status: "success",
      msg: "Products list",
      ...paginatedProducts,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};

export default getAllProductsController;
