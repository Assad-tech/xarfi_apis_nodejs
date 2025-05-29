// routes/adminRoutes.js
import express from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authenticate, authorizeRoles('admin'), (req, res) => {
    res.render('admin/dashboard', { user: req.user });
});

export default router;
