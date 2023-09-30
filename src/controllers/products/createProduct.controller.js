import productDTO from "../../dao/dto/products.dto.js";
import { ProductService } from "../../services/index.js";

const createProductController = async (req, res, next) => {
  try {
    const newProduct = productDTO(req.body);
    const product = await ProductService.createProduct(
      newProduct,
      req.session.user
    );

    return res.status(201).json({
      status: "success",
      msg: "Product created",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export default createProductController;
