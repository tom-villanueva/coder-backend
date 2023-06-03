import { Schema, model } from "mongoose";

const ProductModel = model(
  "products",
  new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: false, default: true },
    category: { type: String, required: true, max: 100 },
  })
);

export default ProductModel;
