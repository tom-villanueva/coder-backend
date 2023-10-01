import env from "../../../config.js";
import { ProductService } from "../../services/index.js";
import { CartService } from "../../services/index.js";

const renderProductsController = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts(req.query);

    const cartProducts = await CartService.getCartProducts(
      req.session.user.cart
    );

    const context = {
      ...products,
      docs: products.docs.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
      })),
      ...req.query,
      user: {
        ...req.session.user,
        productQuantity: cartProducts.length,
      },
      clientUrl: env.clientUrl,
    };

    res.render("products", context);
  } catch (error) {
    next(error);
  }
};

export default renderProductsController;
