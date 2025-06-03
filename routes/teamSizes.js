import express from "express";
import * as teamSizeController from "../controllers/teamSizeController.js";
import validate from "../middleware/validate.js";
import multer from "multer";

// import teamSizeValidationSchema from "../validators/teamSizeValidators.js";
import { teamSizeValidationSchema } from "../validators/teamSizeValidators.js";
import { authenticate } from "../middleware/auth.js";

const upload = multer();

const router = express.Router();

router.post(
  "/team-size",
  authenticate,
  // upload.none(), // Important: must come before validate()
  validate(teamSizeValidationSchema),
  teamSizeController.createTeamSize
);

router.get("/", authenticate, teamSizeController.getTeamSize);

export default router;
