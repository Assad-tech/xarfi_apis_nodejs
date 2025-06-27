// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      de: { type: String },
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    stage: {
      type: String,
      enum: [
        "initial_stage",
        "salon_setup",
        "services",
        "masters",
        "style",
        "products",
        "identity_card",
        "bank_detail",
        "subscription",
        "complete",
      ],
      default: "initial_stage",
    },

    role: {
      type: String,
      enum: ["admin", "master", "salon", "user"],
      default: "salon",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isPasswordChanged: {
      type: Boolean,
      default: false,
    },

    // For account verification and password reset
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.virtual("salons", {
  ref: "Salon", // model to use
  localField: "_id", // field in Category
  foreignField: "owner", // field in Product
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.model("User", userSchema);
