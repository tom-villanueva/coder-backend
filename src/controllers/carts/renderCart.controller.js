import { CartService } from "../../services/index.js";

const renderCartController = async (req, res, next) => {
  try {
    const products = await CartService.getCartProducts(req.params.cid);
    const context = {
      products: products.map((product) => ({
        id: product.product._id,
        title: product.product.title,
        price: product.product.price,
        quantity: product.quantity,
      })),
      total: {
        total: products.reduce(
          (acc, product) => acc + product.product.price * product.quantity,
          0
        ),
      },
      cart: {
        id: req.params.cid,
      },
    };

    res.render("cartDetail", context);
  } catch (error) {
    next(error);
  }
};

export default renderCartController;
