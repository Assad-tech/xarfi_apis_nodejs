import mongoose from "mongoose";

const TeamSizeSchema = new mongoose.Schema(
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

export default mongoose.model("TeamSize", TeamSizeSchema);

// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: String,
//   discription: String,
// });

// export default mongoose.model('Product', productSchema);
