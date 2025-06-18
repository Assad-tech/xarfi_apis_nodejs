import { translateText } from "../lib/translator.js";
import ServiceCategory from "../models/ServiceCategory.js";

export const index = async (req, res) => {
  const serviceCategory = await ServiceCategory.find();

  res.status(200).json({
    status: 1,
    data: serviceCategory,
    message: "Service Category fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    const { name } = req.body;

    const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      de: nameTranslations.de,
    };

    const serviceCategory = await ServiceCategory.create({
      name: nameObj,
    });

    res.status(201).json({
      status: 1,
      data: serviceCategory,
      message: "Service Category created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const show = async (req, res) => {
  const serviceCategory = await ServiceCategory.findById(req.params.id);
  if (!serviceCategory) {
    return res.status(404).json({ error: "Service Category not found" });
  }

  res.status(200).json({
    status: 1,
    data: serviceCategory,
    message: "Service Category fetched successfully.",
  });
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;

    const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      de: nameTranslations.de,
    };

    const serviceCategory = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      {
        name: nameObj,
        new: true,
      }
    );

    res.status(200).json({
      status: 1,
      data: serviceCategory,
      message: "Service Category updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      status: 1,
      data: serviceCategory,
      message: "Service Category deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
