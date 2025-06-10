// controllers/salonController.js
import Salon from "../models/Salon.js";
import Service from "../models/Service.js";

import { translateText } from "../lib/translator.js";
import { ServiceCategory } from "../models/serviceCategory.js";

export const createSalon = async (req, res) => {
  console.log(req.file);
  try {
    const {
      name,
      businessEmail,
      businessPhone,
      location,
      businessRegNo,
      gstVatNo,
      teamSize,
      paymentMode,
      sameTimingForAllDays,
      generalTiming, // { timing: {start, end}, lunchBreak: {start, end} }
      specificDailyTimings, // [{ day, open, timing: {start, end} }]
    } = req.body;

    const images = req.files?.map((file) => file.filename) || [];

    const salon = await Salon.create({
      owner: req.user._id, // assuming auth middleware
      name,
      businessEmail,
      businessPhone,
      location,
      businessRegNo,
      gstVatNo,
      teamSize,
      paymentMode,
      sameTimingForAllDays,
      generalTiming,
      specificDailyTimings,
      images,
    });

    res.status(201).json({
      status: 1,
      data: salon,
      message: "Salon created successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Create new Service
export const createService = async (req, res) => {
  try {
    // ....commented untill the real salon is created....
    // const userId = req.user._id;
    // const salon = await Salon.findOne({ owner: userId });
    // if (!salon) {
    //     return res.status(404).json({ message: 'Salon not found for this user' });
    // }

    const {
      salonId,
      name,
      category,
      description,
      targetGroup,
      duration,
      price,
    } = req.body;

    // Translate name
    const nameTranslations = await translateText(name, ["de"]);
    const nameObj = {
      en: name,
      de: nameTranslations.de,
    };

    // Translate categories (array of strings)
    const translatedCategories = [];
    // const categories = Array.isArray(category) ? category : [category];
    const categories = Array.isArray(req.body.category)
      ? req.body.category
      : [req.body.category];

    for (const categoryId of categories) {
      const categoryDoc = await ServiceCategory.findById(categoryId);

      if (!categoryDoc) {
        return res
          .status(400)
          .json({ error: `Category not found: ${categoryId}` });
      }

      // const translations = await translateText(categoryDoc.name, ["de"]);

      // translatedCategories.push({
      //   en: categoryDoc.name,
      //   de: translations.de,
      // });
    }

    // Translate description
    let descriptionObj = {};
    if (description) {
      const descTranslations = await translateText(description, ["de"]);
      descriptionObj = {
        en: description,
        de: descTranslations.de,
      };
    }

    const imagePath = req.file ? req.file.path : null;

    const newService = new Service({
      owner: req.user._id,
      salon: salonId,
      name: nameObj,
      category: categories,
      description: descriptionObj,
      targetGroup: Array.isArray(targetGroup) ? targetGroup : [targetGroup],
      duration,
      price,
      image: imagePath,
    });

    await newService.save();

    res.status(201).json({ message: "Service created", service: newService });
  } catch (err) {
    console.error("Create Service Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceWithCategory = async (req, res) => {
  // console.log("hello world!");

  try {
    const serviceCategories = await ServiceCategory.find().lean();
    const services = await Service.find().lean(); // use .lean() for better performance

    // Group services under their respective categories
    const groupedData = serviceCategories.map((category) => {
      // console.log(category);
      const categoryServices = services.filter(
        (service) =>
          service.category.map(String).includes(category._id.toString())
        // console.log(service.category)
        // console.log(category._id.toString())
      );

      return {
        // category: {
        //   _id: category._id,
        //   name: category.name,
        // },
        category,
        services: categoryServices,
      };
    });

    return res.status(200).json({
      status: 1,
      data: groupedData,
      message: "Services grouped by category fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      error: error.message,
    });
  }
};

export const destroyService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 1,
      data: service,
      message: "Service deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
