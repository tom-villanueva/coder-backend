import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600, // one hour
  },
});

const TokenModel = model("tokens", TokenSchema);

export default TokenModel;
