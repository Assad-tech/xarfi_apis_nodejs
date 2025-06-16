import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translateText } from "../lib/translator.js";

// Only needed if using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const index = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const products = await Product.find().lean();

  const updatedProducts = products.map((product) => ({
    ...product,
    image: `${baseUrl}/${product.image.replace(/\\/g, "/")}`,
  }));

  res.status(200).json({
    status: 1,
    data: updatedProducts,
    message: "Product fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;

    // console.log("Uploaded File:", req.file);
    const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      de: nameTranslations.de,
    };

    let descriptionObj = {};
    if (description) {
      const descTranslations = await translateText(description, ["de"]);
      descriptionObj = {
        en: description,
        de: descTranslations.de,
      };
    }

    const imagePath = req.file ? req.file.path : null;

    const product = await Product.create({
      owner: req.user._id,
      name: nameObj,
      description: descriptionObj,
      quantity,
      price,
      image: imagePath,
    });

    res.status(201).json({
      status: 1,
      data: product,
      message: "Product created successfully.",
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
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 0,
        message: "product not found.",
      });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image); // go up one level

      // console.log(imagePath);
      // console.log(fs.existsSync(imagePath));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      status: 1,
      data: product,
      message: "Product deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
