import mongoose from "mongoose";

const TeamSizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
