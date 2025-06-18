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

ServiceCategorySchema.virtual("services", {
  ref: "Service", // model to use
  localField: "_id", // field in Category
  foreignField: "category", // field in Product
});

ServiceCategorySchema.set("toObject", { virtuals: true });
ServiceCategorySchema.set("toJSON", { virtuals: true });

export default mongoose.model("ServiceCategory", ServiceCategorySchema);
