// Custom images validator middleware
function validateStyleImages(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one image is required and must be uploaded." });
  }
  if (req.files.length > 3) {
    return res
      .status(400)
      .json({ error: "You can upload a maximum of 3 images." });
  }
  next();
}

export default validateStyleImages;
