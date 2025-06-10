// models/User.js
import mongoose from "mongoose";

const identityCardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    FrontImage: {
      type: String,
      required: true,
    },

    BackImage: {
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

export default mongoose.model("IdentityCard", identityCardSchema);
