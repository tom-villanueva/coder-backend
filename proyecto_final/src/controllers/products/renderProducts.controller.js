import env from "../../../config.js";
import { ProductService } from "../../services/index.js";

const renderProductsController = async (req, res, next) => {
  const products = await ProductService.getAllProducts(req.query);
  const context = {
    ...products,
    docs: products.docs.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
    })),
    ...req.query,
    user: {
      ...req.session.user,
    },
    clientUrl: env.clientUrl,
    isAdmin: req.session.user.role === "admin",
  };

  res.render("products", context);
};

export default renderProductsController;
