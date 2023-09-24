import { Schema, model } from "mongoose";

const UserModel = model(
  "users",
  new Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    age: { type: Number, required: false },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true, max: 100 },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "cart",
    },
    documents: { type: Array, required: false, default: [] },
    last_connection: { type: Date, default: Date.now },
  })
);

export default UserModel;
