// routes/salonRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import multer from "multer";
import { uploadServiceImage } from "../middleware/uploadServiceImage.js";
import * as salonController from "../controllers/salonController.js";
import * as serviceCategoryController from "../controllers/serviceCategoryController.js";
import validate from "../middleware/validate.js";
import { salonSchema } from "../validators/salonValidators.js";
import { authenticate } from "../middleware/auth.js";
import validateImages from "../middleware/validateImages.js";
import { serviceSchema } from "../validators/serviceValidator.js";
const router = express.Router();

// upload.array('images', 6),
// router.post(
//   "/create",
//   authenticate,
//   (req, res, next) =>
//     upload(req, res, function (err) {
//       if (err instanceof multer.MulterError || err) {
//         return res.status(400).json({ error: err.message });
//       }
//       next();
//     }),
//   validateImages,
//   validate(salonSchema),
//   salonController.createSalon
// );

// Create new service (salon owner only)
// router.post(
//   "/service/create",
//   authenticate,
//   uploadServiceImage,
//   validate(serviceSchema),
//   salonController.createService
// );

// router.get("/catogary", authenticate, serviceCategoryController.index);

// router.get(
//   "/catogary-services",
//   authenticate,
//   salonController.getServiceWithCategory
// );

// router.delete("/service/:id", authenticate, salonController.destroyService);

export default router;
