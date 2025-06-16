import Style from "../models/Style.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Only needed if using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { translateText } from "../lib/translator.js";

export const index = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // console.log(baseUrl);

  try {
    const styles = await Style.find().populate("master").lean();

    const updatedStyles = styles.map((style) => ({
      ...style,
      images: style.images.map(
        (img) => `${baseUrl}/uploads/style/${img.replace(/\\/g, "/")}`
      ),
    }));

    res.status(200).json({
      status: 1,
      data: updatedStyles,
      message: "Style fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const { name, master } = req.body;

    const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      de: nameTranslations.de,
    };

    const images = req.files?.map((file) => file.filename) || [];

    const style = await Style.create({
      owner: req.user._id,
      images,
      name: nameObj,
      master,
    });

    res.status(201).json({
      status: 1,
      data: style,
      message: "Style created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const style = await Style.findByIdAndDelete(req.params.id);
    // const style = await Style.findById(req.params.id);

    // console.log(style);

    if (!style) {
      return res.status(404).json({
        status: 0,
        message: "Style not found.",
      });
    }

    if (Array.isArray(style.images)) {
      style.images.forEach((filename) => {
        const relativePath = path.join("uploads", "style", filename);
        const imagePath = path.join(__dirname, "..", relativePath);
        // console.log("imagePath", imagePath);
        // console.log(fs.existsSync(imagePath));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted: ${imagePath}`);
        } else {
          console.warn(`File not found: ${imagePath}`);
        }
      });
    }

    res.status(200).json({
      status: 1,
      data: style,
      message: "style deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
