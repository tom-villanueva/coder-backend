import { ProductService } from "../../services/index.js";

const deleteProductController = async (req, res, next) => {
  try {
    const product = await ProductService.deleteProduct(req.params.pid);

    return res.status(201).json({
      status: "success",
      msg: "Product deleted",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteProductController;
