import bcrypt from "bcryptjs";
import Master from "../models/Master.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Only needed if using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const index = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const masters = await Master.find()
    .populate("services_id") // populates with related Service documents
    .lean();
  //   console.log(master);

  const updatedmasters = masters.map((master) => ({
    ...master,
    image: `${baseUrl}/${master.image.replace(/\\/g, "/")}`,
  }));

  res.status(200).json({
    status: 1,
    data: updatedmasters,
    message: "Master fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      sameTimingForAllDays,
      generalTiming,
      specificDailyTimings,
      services_id,
    } = req.body;

    const existEmail = await Master.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "Email already in use by another master",
      });
    }

    // console.log("Uploaded File:", req.file);
    const hashed = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.path : null;

    const master = await Master.create({
      owner: req.user._id,
      name,
      email,
      password: hashed,
      access_password: password,
      experience,
      sameTimingForAllDays,
      generalTiming,
      specificDailyTimings,
      services_id,
      image: imagePath,
    });

    res.status(201).json({
      status: 1,
      data: master,
      message: "Master created successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const master = await Master.findByIdAndDelete(req.params.id);

    if (!master) {
      return res.status(404).json({
        status: 0,
        message: "Master not found.",
      });
    }

    // ✅ Delete the image file if it exists
    // if (master.image) {
    //   const imagePath = path.resolve(master.image);
    //   if (fs.existsSync(imagePath)) {
    //     fs.unlinkSync(imagePath);
    //   }
    // }

    if (master.image) {
      const imagePath = path.join(__dirname, "..", master.image); // go up one level

      // console.log(imagePath);
      // console.log(fs.existsSync(imagePath));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      status: 1,
      data: master,
      message: "Master deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
