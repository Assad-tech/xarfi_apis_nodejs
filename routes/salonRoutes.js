// routes/salonRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import * as salonController from '../controllers/salonController.js';
import validate from '../middleware/validate.js';
import { salonSchema } from '../validators/salonValidators.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticate, upload.array('images', 6), validate(salonSchema), salonController.createSalon);

export default router;