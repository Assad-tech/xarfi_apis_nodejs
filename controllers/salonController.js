// controllers/salonController.js
import Salon from "../models/Salon.js";
import Service from "../models/Service.js";

import { translateText } from "../lib/translator.js";
import { ServiceCategory } from "../models/serviceCategory.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import Master from "../models/Master.js";
import Style from "../models/Style.js";
import Product from "../models/Product.js";

// Only needed if using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createSalon = async (req, res) => {
  // console.log(req.file);
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

    const existEmail = await Salon.findOne({ businessEmail });
    if (existEmail) {
      return res.status(400).json({
        message: "Email address is already registered to another salon",
      });
    }
    const existPhone = await Salon.findOne({ businessPhone });
    if (existPhone) {
      return res.status(400).json({
        message: "Phone number is already registered to another salon",
      });
    }

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
    return res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

export const index = async (req, res) => {
  try {
    const owner = req.user._id;

    // const user = await User.find(req.user._id).populate("salons");

    const salon = await Salon.findOne({ owner: owner }).sort({ createdAt: -1 });

    const masters = await Master.find({ owner: owner })
      .populate("services_id") // populates with related Service documents
      .lean();

    const styles = await Style.find({ owner: owner }).populate("master").lean();

    const products = await Product.find({ owner: owner }).lean();

    res.json({
      status: 1,
      data: {
        salon: salon,
        masters: masters,
        styles: styles,
        products: products,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
