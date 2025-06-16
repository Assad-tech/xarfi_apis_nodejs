import multer from "multer";
import path from "path";
import fs from "fs";

// Set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/services";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `service-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

export const uploadServiceImage = (req, res, next) => {
  const uploader = upload.single("image");

  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific error
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // File filter or other error
      return res.status(400).json({ error: err.message });
    } else if (!req.file) {
      // No image provided
      return res.status(400).json({ error: "Image field is required" });
    }

    // Continue to next middleware/route handler
    next();
  });
};
