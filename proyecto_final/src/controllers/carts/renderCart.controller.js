import cartsService from "../../services/carts.service.js";

const renderCartController = async (req, res) => {
  const products = await cartsService.getCartProducts(req.params.cid);
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
