import CartModel from "./models/carts.model.js";

export default class Carts {
  constructor() {}

  async get() {
    const carts = await CartModel.find();
    return carts;
  }

  async getOne(id) {
    const cart = await CartModel.findOne({ _id: id });
    return cart;
  }

  async create(data) {
    const result = await CartModel.create(data);
    return result;
  }

  async addProductToCart(id, product) {
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
  }

  async deleteProductFromCart(id, product) {
    const productDeleted = await CartModel.findOneAndUpdate(
      {
        _id: id,
        "products.product": product._id,
      },
      { $pull: { products: { product: product._id } } },
      { new: true }
    );

    return productDeleted;
  }

  async updateCartProducts(id, products) {
    const productsAdded = await CartModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          products: products,
        },
      },
      { new: true }
    );

    return productsAdded;
  }

  async updateCartProduct(id, product, quantity) {
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

    return productUpdated;
  }

  async deleteCartProducts(id) {
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

    return productsDeleted;
  }
}
