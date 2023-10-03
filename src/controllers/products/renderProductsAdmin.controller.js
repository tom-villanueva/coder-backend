import { ProductService } from "../../services/index.js";

const renderProductsAdminController = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts(req.query);

    let contextProducts = products.docs;

    if (req.session.user.role === "premium") {
      contextProducts = products.docs.filter(
        (product) => product.owner === req.session.user.email
      );
    }

    const context = {
      products: contextProducts.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        thumbnail: product.thumbnail,
        status: product.status,
        owner: product.owner,
      })),
    };

    res.render("productsAdmin", context);
  } catch (error) {
    next(error);
  }
};

export default renderProductsAdminController;
