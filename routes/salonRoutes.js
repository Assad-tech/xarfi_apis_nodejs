// routes/salonRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import { uploadServiceImage } from '../middleware/uploadServiceImage.js';
import * as salonController from '../controllers/salonController.js';
import validate from '../middleware/validate.js';
import { salonSchema } from '../validators/salonValidators.js';
import { authenticate } from '../middleware/auth.js';
import { serviceSchema } from '../validators/serviceValidator.js';
const router = express.Router();

router.post('/create', authenticate, upload.array('images', 6), validate(salonSchema), salonController.createSalon);


// Create new service (salon owner only)
router.post('/service/create', authenticate, uploadServiceImage, validate(serviceSchema), salonController.createService);
export default router;

