import { ProductService } from "../../services/index.js";

const deleteProductController = async (req, res) => {
  try {
    const product = await ProductService.deleteProduct(req.params.pid);

    return res.status(201).json({
      status: "success",
      msg: "Product deleted",
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

export default deleteProductController;
