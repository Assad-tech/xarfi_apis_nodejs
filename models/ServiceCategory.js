import mongoose from "mongoose";

const ServiceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ServiceCategory = mongoose.model(
  "ServiceCategory",
  ServiceCategorySchema
);
