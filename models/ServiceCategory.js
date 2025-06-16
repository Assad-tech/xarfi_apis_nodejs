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

// Prevent OverwriteModelError by checking if the model already exists
// const ServiceCategory =
//   mongoose.models.ServiceCategory ||
//   mongoose.model("", ServiceCategorySchema);

// export default ServiceCategory;

export default mongoose.model("ServiceCategory", ServiceCategorySchema);

