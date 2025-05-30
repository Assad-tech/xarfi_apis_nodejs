// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body;

        // res.status(202).json({
        //     message: 'Form Data Received',
        //     formData: req.body,
        // });

        // Basic input validation
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Email validation
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // Role validation
        const allowedRoles = ['user', 'salon'];
        const roleToSave = role && allowedRoles.includes(role) ? role : 'salon';

        const hashed = await bcrypt.hash(password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
        const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 min expiry


        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: hashed,
            role: roleToSave,
            otp,
            otpExpires,
        });
        // console.log('sendEmail is:', sendEmail);

        // Send OTP via email
        await sendEmail(email, 'Verify your account', `Your OTP is ${otp}`);

        res.status(200).json({
            message: 'OTP sent to email. Please verify.',
            userId: user._id,
        });

        // res.status(201).json({
        //     message: 'User registered successfully',
        //     user: { id: user._id, name: user.name, role: user.role },
        //     token: generateToken(user._id),
        // });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// OTP Verification Method
export const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        // console.log('req.body:', req.body);
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'OTP verified successfully',
            token,
            user: { id: user._id, name: user.name, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Resend OTP
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendEmail(user.email, 'Resend OTP for Xarfi Verification', `Your new OTP is ${otp}`);

        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, role: user.role },
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = Math.floor(1000 + Math.random() * 90000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendEmail(email, 'Reset Your Password - Xarfi', `Your OTP to reset password is: ${otp}`);

        res.status(200).json({
            message: 'password reset OTP is sent to your email',
            userId: user._id,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { userId, resetOtp, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (
            user.otp !== resetOtp ||
            !user.otpExpires ||
            user.otpExpires < Date.now()
        ) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Password reset successful',
            token,
            user: { id: user._id, name: user.name, role: user.role },

        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

