import { translateText } from "../lib/translator.js";
import TeamSize from "../models/TeamSize.js";

// import teamSizeValidationSchema from "../validators/teamSizeValidators.js";

export const createTeamSize = async (req, res) => {
  // console.log(name);
  try {
    const { name } = req.body;

    const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      de: nameTranslations.de,
    };

    const teamSize = await TeamSize.create({
      name: nameObj,
    });
    res.status(201).json({
      status: 1,
      data: teamSize,
      message: "Team size created successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTeamSize = async (req, res) => {
  try {
    const teamSizes = await TeamSize.find().sort({ _id: 1 });
    res.status(200).json({
      status: 1,
      data: teamSizes,
      message: "Team size fetched successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  const teamSize = await TeamSize.findById(req.params.id);
  if (!teamSize) {
    return res.status(404).json({ error: "Team Size not found" });
  }

  res.status(200).json({
    status: 1,
    data: teamSize,
    message: "Bank fetched successfully.",
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

    const teamSize = await TeamSize.findByIdAndUpdate(req.params.id, {
      name: nameObj,
      new: true,
    });

    res.status(200).json({
      status: 1,
      data: teamSize,
      message: "Team size updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const teamSize = await TeamSize.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 1,
      data: teamSize,
      message: "Team size deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
