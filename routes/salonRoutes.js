// routes/salonRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import multer from "multer";
import * as salonController from "../controllers/salonController.js";
import validate from "../middleware/validate.js";
import { salonSchema } from "../validators/salonValidators.js";
import { authenticate } from "../middleware/auth.js";
import validateImages from "../middleware/validateImages.js";

const router = express.Router();

// upload.array('images', 6),
router.post(
  "/create",
  authenticate,
  (req, res, next) =>
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    }),
  validateImages,
  validate(salonSchema),
  salonController.createSalon
);

export default router;
