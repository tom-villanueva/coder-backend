import { Schema, model } from "mongoose";

const TicketSchema = new Schema(
  {
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  },
  { timestamps: true }
);

const TicketModel = model("carts", TicketSchema);

export default TicketModel;
