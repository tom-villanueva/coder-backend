import express from "express";
import cartsService from "../../dao/services/carts.service.js";

const viewsCartsRouter = express.Router();

viewsCartsRouter.get("/:cid", async (req, res) => {
  const products = await cartsService.getCartProducts(req.params.cid);
  const context = {
    products: products.map((product) => ({
      title: product.product.title,
      price: product.product.price,
      quantity: product.quantity,
    })),
  };

  res.render("cartDetail", context);
});

export default viewsCartsRouter;
