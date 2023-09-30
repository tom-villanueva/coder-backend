import { ProductService } from "../../services/index.js";

const getProductByIdController = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.pid);
    return res.status(200).json({
      status: "success",
      msg: "Product found",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export default getProductByIdController;
