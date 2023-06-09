import { Schema, model } from "mongoose";
import { ProductSchema } from "./products.model";

const CartSchema = new Schema({
  products: { type: [ProductSchema], required: true },
});

const CartModel = model("carts", CartSchema);

export default CartModel;
