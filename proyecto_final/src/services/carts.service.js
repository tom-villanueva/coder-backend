import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../utils/error.util.js";
import { ProductService } from "./index.js";

class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  checkId(id) {
    if (!id) {
      throw new BadRequestError("Id required");
    }
  }

  async getAllCarts() {
    try {
      const carts = await this.dao.get({});
      return carts;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async getCartProducts(id) {
    try {
      this.checkId(id);
      const cart = await this.dao.getOne({ _id: id });

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
      const cart = await this.dao.create({});
      return cart;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async addProductToCart(id, pid) {
    try {
      const product = await ProductService.getProductById(pid);

      const productAdded = await this.dao.addProductToCart(id, product);

      return productAdded;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async deleteProductFromCart(id, pid) {
    try {
      // lo busco para ver si existe
      const product = await ProductService.getProductById(pid);

      const productDeleted = await this.dao.deleteProductFromCart(id, product);

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
      const products = await ProductService.getProductsByIds(pids);

      if (!products) {
        throw new NotFoundError("One of the products couldn't be found");
      }

      const productsToInsert = products.map((product) => ({
        product: product._id,
        quantity: 1,
      }));

      const productsAdded = await this.dao.updateCartProducts(
        id,
        productsToInsert
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
      const product = await ProductService.getProductById(pid);

      const productUpdated = await this.dao.updateCartProduct(
        id,
        product,
        quantity
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
      const productsDeleted = await this.dao.deleteCartProducts(id);

      if (!productsDeleted) {
        throw new NotFoundError("Cart not found");
      }

      return productsDeleted;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default CartService;
