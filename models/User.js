// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // fullName
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'master', 'salon', 'user'], default: 'salon' },
  isVerified: { type: Boolean, default: false },
  
  // For account verification and password reset
  otp: { type: String },
  otpExpires: { type: Date },
});

export default mongoose.model('User', userSchema);