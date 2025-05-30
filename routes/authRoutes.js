// routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import parseFormData from '../middleware/formDataParser.js';

import { registerSchema, loginSchema, verifyOtpSchema, resendOtpSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', validate(registerSchema), parseFormData, authController.register);
router.post('/verify-otp', validate(verifyOtpSchema), parseFormData, authController.verifyOtp);
router.post('/resend-otp', validate(resendOtpSchema), parseFormData, authController.resendOtp);

router.post('/login', validate(loginSchema), parseFormData, authController.login);

router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
// router.post('/forgot-password/verify-otp', validate(verifyOtpSchema), parseFormData, authController.forgotPasswordVerifyOtp);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);



export default router;
