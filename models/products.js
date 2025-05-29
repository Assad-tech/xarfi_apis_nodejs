// models/User.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  discription: String,
});

export default mongoose.model('Product', productSchema);
