import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const styleShema = new mongoose.Schema(
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

    images: {
      type: [String], // image URLs or filenames
      validate: [arrayLimit, "Maximum 3 images allowed"],
    },

    name: {
      en: { type: String, required: true },
      de: { type: String },
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

styleShema.plugin(mongoosePaginate);
//   export default mongoose.model("Salon", salonSchema);

export default mongoose.model("Style", styleShema);
