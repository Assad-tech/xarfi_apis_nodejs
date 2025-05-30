// controllers/salonController.js
import Salon from '../models/Salon.js';

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
