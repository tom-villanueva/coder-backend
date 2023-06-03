import { Schema, model } from "mongoose";

const CartModel = model(
  "carts",
  new Schema({
    products: { type: Array, required: true, default: [] },
  })
);

export default CartModel;
