import IdentityCard from "../models/IdentityCard.js";

export const store = async (req, res) => {
  try {
    const { user } = req;

    const frontImagePath = req.files["frontImage"]
      ? req.files["frontImage"][0].path
      : null;

    const backImagePath = req.files["backImage"]
      ? req.files["backImage"][0].path
      : null;

    if (!frontImagePath) {
      return res.status(400).json({ message: "Front image are required." });
    }

    if (!backImagePath) {
      return res.status(400).json({ message: "Back image are required." });
    }

    const identityCart = await IdentityCard.create({
      owner: user._id,
      salon: req.body.salon,
      frontImage: frontImagePath,
      backImage: backImagePath,
    });

    res.status(201).json({
      status: 1,
      data: identityCart,
      message: "Identity card uploaded successfully.",
    });

    // const imagePath = req.file ? req.file.path : null;
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
