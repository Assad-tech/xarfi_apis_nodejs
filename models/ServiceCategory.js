import mongoose from "mongoose";

const ServiceCategorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      de: { type: String },
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
