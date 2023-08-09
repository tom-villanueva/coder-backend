import { ProductService } from "../../services/index.js";

const createProductController = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);

    return res.status(201).json({
      status: "success",
      msg: "Product created",
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

export default createProductController;
