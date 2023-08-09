import { ProductService } from "../../services/index.js";

const updateProductController = async (req, res) => {
  try {
    const product = await ProductService.updateProduct(
      req.params.pid,
      req.body
    );

    return res.status(201).json({
      status: "success",
      msg: "Product updated",
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

export default updateProductController;
