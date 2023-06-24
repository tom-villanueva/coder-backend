import { Schema, model } from "mongoose";

const UserModel = model(
  "users",
  new Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    age: { type: Number, required: true },
    password: { type: String, required: true },
  })
);

export default UserModel;
