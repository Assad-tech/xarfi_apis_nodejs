// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
// import { translateText } from "../lib/translator.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }
    const existPhone = await User.findOne({ phoneNumber });
    if (existPhone) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    // const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      // de: nameTranslations.de,
    };

    // Role validation
    const allowedRoles = ["user", "salon"];
    const roleToSave = role && allowedRoles.includes(role) ? role : "salon";

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 min expiry

    const user = await User.create({
      name: nameObj,
      email,
      phoneNumber,
      password: hashed,
      role: roleToSave,
      otp,
      otpExpires,
    });

    // console.log('sendEmail is:', sendEmail);
    // Send OTP via email
    await sendEmail(email, "Verify your account", `Your OTP is ${otp}`);

    res.status(200).json({
      status: 1,
      data: {
        userId: user._id,
        otpExpiresTime: otpExpires,
      },
      message: "OTP sent to email. Please verify.",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// OTP Verification Method
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // console.log('user.otp:', user.otp);
    // console.log('req.otp:', otp);
    // console.log('otpExpires:', user.otpExpires);
    // console.log('currentTime:', new Date());

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: { id: user._id, name: user.name, role: user.role },
      stage: "salon_setup",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Resend OTP
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 1 minute

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(
      user.email,
      "Resend OTP for Xarfi Verification",
      `Your new OTP is ${otp}`
    );

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  //   console.log("hello");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, role: user.role },
      token: generateToken(user._id),
      stage: "salon_setup",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 90000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 10 minutes
    const isPasswordChanged = false;
    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isPasswordChanged = isPasswordChanged;
    await user.save();

    await sendEmail(
      email,
      "Xarfi - Reset Your Password OTP ",
      `Your OTP to reset password is: ${otp}`
    );

    res.status(200).json({
      message: "password reset OTP is sent to your email",
      userId: user._id,
      otpExpires: user.otpExpires,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// forgotPassword Verify OTP
export const forgotPasswordVerifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || !user.otpExpires)
      return res.status(400).json({ message: "No OTP requested" });

    const isOtpValid = user.otp === otp && user.otpExpires > Date.now();

    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid — now you can allow password reset in the next step
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      message: "Forgot password OTP verified successfully.",
      userId: user._id, // may be needed for next step
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isPasswordChanged = true;
    await user.save();
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Password reset successful",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
