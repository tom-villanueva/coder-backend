import productsService from "../../services/products.service.js";

const createProductController = async (req, res) => {
  try {
    const product = await productsService.createProduct(req.body);

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
