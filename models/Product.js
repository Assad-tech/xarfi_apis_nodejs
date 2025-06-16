// models/User.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      en: { type: String, required: true },
      de: { type: String },
    },
    description: {
      en: { type: String, required: true },
      de: { type: String },
    },
    quantity: {
      type: Number,
      required: false,
    },

    price: {
      type: Number,
      required: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
