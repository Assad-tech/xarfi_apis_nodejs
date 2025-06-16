import { translateText } from "../../lib/translator.js";
import Subscription from "../../models/Subscription.js";

export const index = async (req, res) => {
  const subscription = await Subscription.find();

  res.status(200).json({
    status: 1,
    data: subscription,
    message: "Subscription fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    // console.log(req.body);

    const { planType, price, description } = req.body;

    const planTypeTranslations = await translateText(planType, ["de"]);
    const planTypeObj = {
      en: planType,
      de: planTypeTranslations.de,
    };

    let descriptionObj = {};
    if (description) {
      const descTranslations = await translateText(description, ["de"]);
      descriptionObj = {
        en: description,
        de: descTranslations.de,
      };
    }

    const subscription = await Subscription.create({
      planType: planTypeObj,
      price,
      description: descriptionObj,
    });

    res.status(201).json({
      status: 1,
      data: subscription,
      message: "Subscription created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const show = async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription) {
    return res.status(404).json({ error: "Bank not found" });
  }

  res.status(200).json({
    status: 1,
    data: subscription,
    message: "Subscription fetched successfully.",
  });
};

export const update = async (req, res) => {
  try {
    const { planType, price, description } = req.body;

    const planTypeTranslations = await translateText(planType, ["de"]);
    const planTypeObj = {
      en: planType,
      de: planTypeTranslations.de,
    };

    let descriptionObj = {};
    if (description) {
      const descTranslations = await translateText(description, ["de"]);
      descriptionObj = {
        en: description,
        de: descTranslations.de,
      };
    }

    const subscription = await Subscription.findByIdAndUpdate(req.params.id, {
      planType: planTypeObj,
      price,
      description: descriptionObj,
      new: true,
    });

    res.status(200).json({
      status: 1,
      data: subscription,
      message: "Subscription updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 1,
      data: subscription,
      message: "Subscription deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
