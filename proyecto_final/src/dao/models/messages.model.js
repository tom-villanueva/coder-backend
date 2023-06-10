import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 100 },
});

const MessageModel = model("messages", messageSchema);

export default MessageModel;
