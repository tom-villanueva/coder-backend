import productsService from "../../services/products.service.js";

const getProductByIdController = async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.pid);
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
