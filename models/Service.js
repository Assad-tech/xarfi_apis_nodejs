import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    salon: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },

    name: {
        en: { type: String, required: true },
        de: { type: String }
    },

    category: [
        {
            en: { type: String, required: true },
            de: { type: String }
        }
    ],

    description: {
        en: { type: String },
        de: { type: String }
    },

    targetGroup: {
        type: [String],
        enum: ['All', 'Men', 'Women', 'Children'],
        required: true
    },

    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);

