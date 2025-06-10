// middlewares/upload.js
import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

// ES Module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads/style");
    fs.mkdirSync(uploadPath, { recursive: true }); // ensure folder exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png files are allowed"));
  }
};

// Multer config: max 6 files, each max 5MB
const uploadStyleImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
}).array("images", 3);

export default uploadStyleImage;
