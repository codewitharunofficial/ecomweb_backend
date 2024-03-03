import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: {},
        ref: "Products",
      },
    ],

    buyers: { type: {}, ref: "User" },

    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Confirmed", "Shipped", "Delivered", "Cancel"],
    },

    payment : {
      type: String,
      default: "Failed",
      enum: ["Failed", "Completed"]
    }, 
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
