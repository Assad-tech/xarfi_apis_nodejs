import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import salonRoutes from "./routes/salonRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import teamSelectRoutes from "./routes/teamSizes.js";
import salonOwner from "./routes/salonOwnerRoutes.js";
import admin from "./routes/adminRoutes.js";
import parseFormData from "./middleware/formDataParser.js";
import path from "path";
import { fileURLToPath } from "url";

// import userRoutes from './routes/userRoutes.js';
// import parseFormData from "./middleware/formDataParser.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

// Middleware
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", parseFormData, authRoutes);
app.use("/salon", salonRoutes);
app.use("/teamSize", parseFormData, teamSelectRoutes);

app.use("/api/admin", admin);

app.use("/api/salon-owner", salonOwner);

// app.use('/admin', adminRoutes);
// app.use('/salon', salonRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
