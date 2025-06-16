// routes/adminRoutes.js
import express from "express";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import * as teamSizeController from "../controllers/teamSizeController.js";
import * as backController from "../controllers/admin/backController.js";
import * as subscriptionController from "../controllers/admin/subscriptionController.js";
import * as serviceCategoryController from "../controllers/serviceCategoryController.js";
import validate from "../middleware/validate.js";
import multer from "multer";
import { bankValidationSchema } from "../validators/bankValidators.js";
import { subscriptionValidationSchema } from "../validators/subscriptionValidators.js";
import { teamSizeValidationSchema } from "../validators/teamSizeValidators.js";
import { serviceCategorySchema } from "../validators/serviceCategoryValidator.js";
import parseFormData from "../middleware/formDataParser.js";

const upload = multer();
const router = express.Router();

router.get("/dashboard", authenticate, authorizeRoles("admin"), (req, res) => {
  res.render("admin/dashboard", { user: req.user });
});

// team size
router.post(
  "/team-size",
  // authenticate,
  parseFormData,
  validate(teamSizeValidationSchema),
  teamSizeController.createTeamSize
);

router.get("/team-size", teamSizeController.getTeamSize);
router.get("/team-size/:id", teamSizeController.show);

router.put(
  "/team-size/:id",
  parseFormData,
  validate(teamSizeValidationSchema),
  teamSizeController.update
);

router.delete("/team-size/:id", teamSizeController.destroy);

// category
router.post(
  "/service-category",
  parseFormData,
  validate(serviceCategorySchema),
  serviceCategoryController.store
);

router.get("/service-category", serviceCategoryController.index);
router.get("/service-category/:id", serviceCategoryController.show);

router.put(
  "/service-category/:id",
  parseFormData,
  validate(serviceCategorySchema),
  serviceCategoryController.update
);

router.delete("/service-category/:id", serviceCategoryController.destroy);

// bank
router.post("/bank", validate(bankValidationSchema), backController.store);

router.get("/bank", backController.index);
router.get("/bank/:id", backController.show);

router.put("/bank/:id", validate(bankValidationSchema), backController.update);

router.delete("/bank/:id", backController.destroy);

// subscription
router.post(
  "/subscription",
  validate(subscriptionValidationSchema),
  subscriptionController.store
);

router.get("/subscription", subscriptionController.index);
router.get("/subscription/:id", subscriptionController.show);
router.put(
  "/subscription/:id",
  validate(subscriptionValidationSchema),
  subscriptionController.update
);
router.delete("/subscription/:id", subscriptionController.destroy);

export default router;
