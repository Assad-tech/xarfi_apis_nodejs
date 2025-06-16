import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    // adminId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }

    // planType: { type: String, enum: ["monthly", "yearly"], required: true },
    planType: {
      en: { type: String, enum: ["monthly", "yearly"], required: true },
      de: { type: String },
    },
    price: { type: Number, required: true },

    description: {
      en: { type: String, required: true },
      de: { type: String },
    },

    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
