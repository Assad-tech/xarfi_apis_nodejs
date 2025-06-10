import express from "express";
import validate from "../middleware/validate.js";
import * as serviceCategoryController from "../controllers/serviceCategoryController.js";
import * as masterController from "../controllers/masterController.js";
import * as styleController from "../controllers/styleController.js";
import * as productController from "../controllers/productController.js";
import * as authController from "../controllers/authController.js";
import { serviceCategorySchema } from "../validators/serviceCategoryValidator.js";
import { masterValidationSchema } from "../validators/masterValidators.js";
import { authenticate } from "../middleware/auth.js";
import { uploadMasterImage } from "../middleware/uploadMasterImage.js";
import { uploadProductImage } from "../middleware/uploadProductImage.js";
import uploadStyleImage from "../middleware/uploadStyleImage.js";
import multer from "multer";
import validateStyleImages from "../middleware/validateStyleImages.js";
import { styleValidationSchema } from "../validators/styleValidators.js";
import { loginSchema } from "../validators/authValidators.js";
import { productValidationSchema } from "../validators/productValidators.js";

// const router = express.Router();

const router = express.Router();

//login
// router.post("/auth/login", validate(loginSchema), authController.login);

// master
router.get("/master", authenticate, masterController.index);

router.post(
  "/master",
  authenticate,
  uploadMasterImage,
  validate(masterValidationSchema),
  masterController.store
);
// router.delete("/service-category/:id", serviceCategoryController.destroy);
router.delete("/master/:id", authenticate, masterController.destroy);

router.post(
  "/style",
  authenticate,
  (req, res, next) =>
    uploadStyleImage(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    }),
  validateStyleImages,
  validate(styleValidationSchema),
  styleController.store
);

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

// this is adminsite route
router.post(
  "/service-category",
  validate(serviceCategorySchema),
  serviceCategoryController.store
);

router.get("/service-category", serviceCategoryController.index);
router.get("/service-category/:id", serviceCategoryController.show);

router.put(
  "/service-category/:id",
  validate(serviceCategorySchema),
  serviceCategoryController.update
);

router.delete("/service-category/:id", serviceCategoryController.destroy);

export default router;
