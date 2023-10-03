import { ProductService } from "../../services/index.js";
import { pathToPublic } from "../../utils/storage.util.js";

const renderProductDetailController = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.pid);
    const context = {
      product: {
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        category: product.category,
        stock: product.stock,
        price: product.price,
        status: product.status,
        thumbnail: pathToPublic(product.thumbnail),
      },
    };

    res.render("productDetail", context);
  } catch (error) {
    next(error);
  }
};

export default renderProductDetailController;
