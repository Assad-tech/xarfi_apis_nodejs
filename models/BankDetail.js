import mongoose from "mongoose";

const bankDetailSchema = new mongoose.Schema(
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
    accountTitle: {
      en: { type: String, required: true },
      de: { type: String },
    },

    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: true,
    },

    iban: {
      type: String,
      required: true,
    },

    bic: {
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

export default mongoose.model("BankDetail", bankDetailSchema);
