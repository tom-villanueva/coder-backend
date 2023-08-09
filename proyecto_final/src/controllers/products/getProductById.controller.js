import { ProductService } from "../../services/index.js";

const getProductByIdController = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.pid);
    return res.status(200).json({
      status: "success",
      msg: "Product found",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};

export default getProductByIdController;
