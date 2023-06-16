import CartModel from "../models/carts.model.js";
import { BadRequestError, NotFoundError, ServerError } from "../error.js";
import productsService from "./products.service.js";

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

      if (!cart) {
        throw new NotFoundError("Cart not found");
      }

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

  async addProductToCart(id, pid) {
    try {
      const product = await productsService.getProductById(pid);

      let productAdded = await CartModel.findOneAndUpdate(
        {
          _id: id,
          "products.product": product._id,
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
          { $push: { products: { product: product._id, quantity: 1 } } },
          { new: true }
        );
      }

      return productAdded;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async deleteProductFromCart(id, pid) {
    try {
      // lo busco para ver si existe
      const product = await productsService.getProductById(pid);

      const productDeleted = await CartModel.findOneAndUpdate(
        {
          _id: id,
          "products.product": product._id,
        },
        { $pull: { products: { product: product._id } } },
        { new: true }
      );

      if (!productDeleted) {
        throw new NotFoundError("Product or cart not found");
      }

      return productDeleted;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async updateCartProducts(id, pids) {
    try {
      const products = await productsService.getProductsByIds(pids);

      if (!products) {
        throw new NotFoundError("One of the products couldn't be found");
      }

      const productsToInsert = products.map((product) => ({
        product: product._id,
        quantity: 1,
      }));

      const productsAdded = await CartModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            products: productsToInsert,
          },
        },
        { new: true }
      );

      if (!productsAdded) {
        throw new NotFoundError("Cart not found");
      }

      return productsAdded;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async updateCartProduct(id, pid, quantity) {
    try {
      if (!quantity) {
        throw new BadRequestError("Quantity field is missing");
      }
      // lo busco para ver si existe
      const product = await productsService.getProductById(pid);

      const productUpdated = await CartModel.findOneAndUpdate(
        {
          _id: id,
          "products.product": product._id,
        },
        {
          $set: {
            "products.$.quantity": quantity,
          },
        },
        { new: true }
      );

      if (!productUpdated) {
        throw new NotFoundError("Cart not found");
      }

      return productUpdated;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async deleteCartProducts(id) {
    try {
      const productsDeleted = await CartModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            products: [],
          },
        },
        { new: true }
      );

      if (!productsDeleted) {
        throw new NotFoundError("Cart not found");
      }

      return productsDeleted;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default new CartService();
