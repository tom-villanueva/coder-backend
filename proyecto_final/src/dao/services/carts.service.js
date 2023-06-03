import CartModel from "../dao/models/carts.model.js";

class CartService {
  async getAllCarts() {
    const carts = await CartModel.find({});
    return carts;
  }
}

export default new CartService();
