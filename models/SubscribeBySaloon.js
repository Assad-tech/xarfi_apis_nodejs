import mongoose from "mongoose";

const subscribeBySaloonSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    startDate: { type: Date, default: Date.now },
    nextBillingDate: { type: Date, required: true },
    active: { type: Boolean, default: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("SubscribeBySaloon", subscribeBySaloonSchema);
