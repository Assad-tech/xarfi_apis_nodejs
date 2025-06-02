// controllers/salonController.js
import Salon from '../models/Salon.js';
import Service from '../models/Service.js';

import { translateText } from '../lib/translator.js';

export const createSalon = async (req, res) => {
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
            generalTiming,         // { timing: {start, end}, lunchBreak: {start, end} }
            specificDailyTimings,  // [{ day, open, timing: {start, end} }]
        } = req.body;

        const images = req.files?.map(file => file.filename) || [];

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
    console.log('req.file:', req);
    try {
        const userId = req.user._id;
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

        // Translate if description is provided
        let descriptionObj = {};
        if (description) {
            const translations = await translateText(description, ['de']);
            descriptionObj = {
                en: description,
                de: translations.de
            };
        }

        const imagePath = req.file ? req.file.path : null;

        const newService = new Service({
            salon: salonId,
            name,
            // category,
            category: Array.isArray(category) ? category : [category],
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
