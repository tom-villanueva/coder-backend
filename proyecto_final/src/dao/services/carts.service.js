import CartModel from "../models/carts.model.js";
import { BadRequestError, NotFoundError, ServerError } from "../error.js";

class CartService {
  checkId(id) {
    if (!id) {
      throw new BadRequestError("Id required");
    }
  }

  async getAllCarts() {
    try {
      const carts = await CartModel.find({});
      return carts;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async getCartProducts(id) {
    try {
      this.checkId(id);
      const cart = await CartModel.findOne({ _id: id });

      return cart.products;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async createCart() {
    try {
      const cart = await CartModel.create({});
      return cart;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async addProductToCart(id, product) {
    try {
      let productAdded = await CartModel.findOneAndUpdate(
        {
          _id: id,
          "products.pid": product._id,
        },
        {
          $inc: {
            "products.$.quantity": 1,
          },
        },
        { new: true }
      );

      // if the product is a new one
      if (!productAdded) {
        productAdded = await CartModel.findOneAndUpdate(
          {
            _id: id,
          },
          { $push: { products: { pid: product._id, quantity: 1 } } },
          { new: true }
        );
      }

      return productAdded;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default new CartService();
