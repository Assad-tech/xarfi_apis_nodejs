import mongoose from "mongoose";

const styleShema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    images: {
      type: [String], // image URLs or filenames
      validate: [arrayLimit, "Maximum 3 images allowed"],
    },

    name: {
      type: String,
      required: false,
    },
    master: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Master",
        default: null,
      },
    ],

    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

//   export default mongoose.model("Salon", salonSchema);

export default mongoose.model("Style", styleShema);
