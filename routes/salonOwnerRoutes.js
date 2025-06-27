import express from "express";
import validate from "../middleware/validate.js";
import * as salonController from "../controllers/salonController.js";
import * as teamSizeController from "../controllers/teamSizeController.js";

import * as masterController from "../controllers/masterController.js";
import * as styleController from "../controllers/styleController.js";
import * as productController from "../controllers/productController.js";
import * as identityCardController from "../controllers/identityCardController.js";
import * as bankDetailController from "../controllers/bankDetailController.js";
import * as subscribeBySaloonController from "../controllers/subscribeBySaloonController.js";
import * as serviceCategoryController from "../controllers/serviceCategoryController.js";
import * as serviceController from "../controllers/serviceController.js";
import { salonSchema } from "../validators/salonValidators.js";

import { masterValidationSchema } from "../validators/masterValidators.js";
import { authenticate } from "../middleware/auth.js";
import { uploadMasterImage } from "../middleware/uploadMasterImage.js";
import { uploadProductImage } from "../middleware/uploadProductImage.js";
import { uploadServiceImage } from "../middleware/uploadServiceImage.js";
import uploadStyleImage from "../middleware/uploadStyleImage.js";
import validateImages from "../middleware/validateImages.js";
import multer from "multer";
import validateStyleImages from "../middleware/validateStyleImages.js";
import { styleValidationSchema } from "../validators/styleValidators.js";
import { loginSchema } from "../validators/authValidators.js";
import { productValidationSchema } from "../validators/productValidators.js";
import { uploadIdentityImages } from "../middleware/uploadIdentityCardImage.js";
import { bankDetailValidationSchema } from "../validators/bankDetailValidators.js";
import parseFormData from "../middleware/formDataParser.js";
import { subscribeBySaloonValidationSchema } from "../validators/subscribeBySaloonValidators.js";
import handleImageUpload from "../middleware/upload.js";
import { serviceSchema } from "../validators/serviceValidator.js";

// const router = express.Router();

const router = express.Router();

// salon
router.post(
  "/salon",
  authenticate,
  handleImageUpload,
  validateImages,
  validate(salonSchema),
  salonController.createSalon
);
router.get("/team-size", authenticate, teamSizeController.getTeamSize);

// service
router.post(
  "/service",
  authenticate,
  uploadServiceImage,
  validate(serviceSchema),
  serviceController.createService
);
router.get("/catogary", authenticate, serviceCategoryController.index);

router.post(
  "/catogary-services",
  authenticate,
  parseFormData,
  serviceController.getServiceWithCategory
);

router.delete("/service/:id", authenticate, serviceController.destroyService);

// master
router.get("/master", authenticate, masterController.index);

router.post(
  "/master",
  authenticate,
  uploadMasterImage,
  validate(masterValidationSchema),
  masterController.store
);

router.delete("/master/:id", authenticate, masterController.destroy);

// style
router.post(
  "/style",
  authenticate,
  uploadStyleImage,
  validateStyleImages,
  validate(styleValidationSchema),
  styleController.store
);

// (req, res, next) =>
// uploadStyleImage(req, res, function (err) {
//   if (err instanceof multer.MulterError || err) {
//     return res.status(400).json({ error: err.message });
//   }
//   next();
// }),

router.get("/style", authenticate, styleController.index);

router.delete("/style/:id", authenticate, styleController.destroy);

// product
router.post(
  "/product",
  authenticate,
  uploadProductImage,
  validate(productValidationSchema),
  productController.store
);

router.get("/product", authenticate, productController.index);

router.delete("/product/:id", authenticate, productController.destroy);

// Identity Card
router.post(
  "/identity-card",
  authenticate,
  uploadIdentityImages,
  identityCardController.store
);

// Bank Details
router.post(
  "/bank-detail",
  authenticate,
  parseFormData,
  validate(bankDetailValidationSchema),
  bankDetailController.store
);

// subscription
router.get(
  "/getPlanOptions",
  authenticate,
  subscribeBySaloonController.getPlanOptions
);

router.post(
  "/subscription-plan",
  authenticate,
  parseFormData,
  validate(subscribeBySaloonValidationSchema),
  subscribeBySaloonController.createSubscription
);

// get salon
router.get("/get-salon", authenticate, parseFormData, salonController.index);

// this is adminsite route

export default router;
