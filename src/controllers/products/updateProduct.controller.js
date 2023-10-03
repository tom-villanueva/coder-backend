import { ProductService } from "../../services/index.js";

const updateProductController = async (req, res, next) => {
  try {
    const product = await ProductService.updateProduct(
      req.params.pid,
      req.body,
      req.file,
      req.session.user
    );

    return res.status(201).json({
      status: "success",
      msg: "Product updated",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export default updateProductController;
