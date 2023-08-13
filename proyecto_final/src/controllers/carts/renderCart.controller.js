import { CartService } from "../../services/index.js";

const renderCartController = async (req, res, next) => {
  const products = await CartService.getCartProducts(req.params.cid);

  const context = {
    products: products.map((product) => ({
      title: product.product.title,
      price: product.product.price,
      quantity: product.quantity,
    })),
  };

  res.render("cartDetail", context);
};

export default renderCartController;
