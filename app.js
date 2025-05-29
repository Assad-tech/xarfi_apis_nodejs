import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import salonRoutes from './routes/salonRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRoutes);
app.use('/salon', salonRoutes);
// app.use('/admin', adminRoutes);
// app.use('/salon', salonRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
