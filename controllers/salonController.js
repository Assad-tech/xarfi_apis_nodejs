// controllers/salonController.js
import Salon from '../models/Salon.js';
import Service from '../models/Service.js';

import { translateText } from '../lib/translator.js';

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
            message: 'Salon created successfully',
            salon,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
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
            price
        } = req.body;

        // Translate name
        const nameTranslations = await translateText(name, ['de']);
        const nameObj = {
            en: name,
            de: nameTranslations.de
        };

        // Translate categories (array of strings)
        const translatedCategories = [];
        const categories = Array.isArray(category) ? category : [category];
        for (const cat of categories) {
            const catTranslations = await translateText(cat, ['de']);
            translatedCategories.push({
                en: cat,
                de: catTranslations.de
            });
        }

        // Translate description
        let descriptionObj = {};
        if (description) {
            const descTranslations = await translateText(description, ['de']);
            descriptionObj = {
                en: description,
                de: descTranslations.de
            };
        }

        const imagePath = req.file ? req.file.path : null;

        const newService = new Service({
            salon: salonId,
            name: nameObj,
            category: translatedCategories,
            description: descriptionObj,
            targetGroup: Array.isArray(targetGroup) ? targetGroup : [targetGroup],
            duration,
            price,
            image: imagePath
        });

        await newService.save();

        res.status(201).json({ message: 'Service created', service: newService });
    } catch (err) {
        console.error('Create Service Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
