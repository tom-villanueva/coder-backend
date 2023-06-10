import { Schema, model } from "mongoose";

export const ProductSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: false, default: "" },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: false, default: true },
  category: { type: String, required: true, max: 100 },
});

ProductSchema.path("code").validate(async function validateDuplicatedCode(
  value
) {
  if (!this.isNew && !this.isModified("code")) return true;

  try {
    const ProductModel = model("products");

    const count = await ProductModel.countDocuments({ code: value });
    if (count > 0) return false;

    return true;
  } catch (error) {
    return false;
  }
},
"Code already exists");

const ProductModel = model("products", ProductSchema);

export default ProductModel;
