import Service from "../models/Service.js";

import { translateText } from "../lib/translator.js";
import { ServiceCategory } from "../models/serviceCategory.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Only needed if using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create new Service
export const createService = async (req, res) => {
  try {
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

    res.status(201).json({
      status: 1,
      service: newService,
      message: "Service created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

export const getServiceWithCategory = async (req, res) => {
  // console.log("hello world!");
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  try {
    // console.log(req.body);
    const { targetGroup } = req.body;
    const filterValue = targetGroup ?? "All";
    // return req.body.targetGroup;
    const serviceCategories = await ServiceCategory.find().lean();
    const services = await Service.find({ targetGroup: filterValue }).lean(); // use .lean() for better performance

    // return res.json({
    //   data: services,
    // });

    const updatedServices = services.map((service) => ({
      ...service,
      image: `${baseUrl}/${service.image.replace(/\\/g, "/")}`,
    }));

    // return res.json({
    //   data: updatedServices,
    // });

    // Group services under their respective categories
    const groupedData = serviceCategories.map((category) => {
      // console.log(category);
      const categoryServices = updatedServices.filter(
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
    // const service = await Service.findById(req.params.id);

    // return res.json({
    //   data: service,
    // });

    if (!service) {
      return res.status(404).json({
        status: 0,
        message: "service not found.",
      });
    }

    if (service.image) {
      const imagePath = path.join(__dirname, "..", service.image); // go up one level

      // console.log(imagePath);
      // console.log(fs.existsSync(imagePath));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

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
