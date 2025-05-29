// validators/authValidator.js
import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(7).max(15).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'master', 'salon', 'user').required(), // Updated valid roles
});

export const verifyOtpSchema = Joi.object({
    userId: Joi.string().required(),
    otp: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
});


export const resendOtpSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});


export const resetPasswordSchema = Joi.object({
    userId: Joi.string().required(),
    resetOtp: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
});