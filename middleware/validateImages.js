// Custom images validator middleware
function validateImages(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      message: "At least one image is required and must be uploaded.",
    });
  }
  if (req.files.length > 6) {
    return res
      .status(400)
      .json({ message: "You can upload a maximum of 6 images." });
  }
  next();
}

export default validateImages;
