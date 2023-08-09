import { ProductService } from "../../services/index.js";

const renderProductsController = async (req, res) => {
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
  };

  res.render("products", context);
};

export default renderProductsController;
