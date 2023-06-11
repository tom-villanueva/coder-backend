import { Schema, model } from "mongoose";

const CartItemSchema = new Schema({
  pid: { type: Schema.Types.ObjectId, ref: "products", required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
});

const CartSchema = new Schema({
  products: { type: [CartItemSchema], required: true },
});

const CartModel = model("carts", CartSchema);

export default CartModel;
