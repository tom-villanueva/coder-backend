import {
  BadRequestError,
  NotFoundError,
  ServerError,
  UnprocessableContentError,
} from "../utils/error.util.js";
import { ProductService, TicketService } from "./index.js";
// import CartModel from "../dao/mongo/models/carts.model.js";
// import ProductModel from "../dao/mongo/models/products.model.js";

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

  async updateCartProducts(id, products) {
    try {
      const existProducts = await ProductService.getProductsByIds(
        products.map((p) => p.id.toString())
      );

      if (!existProducts) {
        throw new NotFoundError("One of the products couldn't be found");
      }

      const productsToInsert = products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
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

  async purchase(cid, user) {
    // const session = await ProductModel.startSession();
    try {
      this.checkId(cid);
      // session.startTransaction();
      const cart = await this.dao.getOne({ _id: cid });

      if (cart.products.length === 0) {
        throw new BadRequestError(
          "Can't perform purchase. No products in cart"
        );
      }

      const purchasedProducts = [];
      const notPurchasedProducts = [];

      for (const item of cart.products) {
        if (item.product.stock >= item.quantity) {
          await ProductService.updateProduct(item.product._id.toString(), {
            stock: item.product.stock - item.quantity,
          });
          purchasedProducts.push(item);
        } else {
          notPurchasedProducts.push(item);
        }
      }

      let ticket;
      if (purchasedProducts.length > 0) {
        const amount = purchasedProducts.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );

        ticket = await TicketService.createTicket({
          amount,
          code: " ",
          purchaser: user.email,
        });
      } else {
        throw new UnprocessableContentError(
          "No available stock for any of the products"
        );
      }

      if (notPurchasedProducts.length > 0) {
        await this.updateCartProducts(
          cid,
          notPurchasedProducts.map((item) => ({
            id: item.product._id.toString(),
            quantity: item.quantity,
          }))
        );
      } else {
        await this.deleteCartProducts(cid);
      }

      // await session.commitTransaction();

      return {
        ticket,
        notPurchasedProducts: notPurchasedProducts.map((item) =>
          item._id.toString()
        ),
      };
    } catch (error) {
      // await session.abortTransaction();

      if (error.name === "BadRequestError") {
        throw error;
      }

      if (error.name === "UnprocessableContentError") {
        throw error;
      }

      throw new ServerError(error);
    } finally {
      // session.endSession();
    }
  }
}

export default CartService;
