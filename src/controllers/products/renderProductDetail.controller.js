import { ProductService } from "../../services/index.js";

const renderProductDetailController = async (req, res, next) => {
  const product = await ProductService.getProductById(req.params.pid);
  const context = {
    product: {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      stock: product.stock,
      price: product.price,
    },
  };

  res.render("productDetail", context);
};

export default renderProductDetailController;
