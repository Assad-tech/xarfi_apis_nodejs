// routes/authRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import parseFormData from "../middleware/formDataParser.js";

import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  forgotPasswordVerifyOtpSchema,
  resetPasswordSchema,
} from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);
router.post("/resend-otp", validate(resendOtpSchema), authController.resendOtp);

router.post("/login", validate(loginSchema), authController.login);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
router.post(
  "/forgot-password/verify-otp",
  validate(forgotPasswordVerifyOtpSchema),
  authController.forgotPasswordVerifyOtp
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword
);

export default router;
