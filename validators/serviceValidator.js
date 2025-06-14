// validators/serviceValidator.js
import Joi from 'joi';

export const serviceSchema = Joi.object({
    salonId: Joi.string().required(), // ObjectId of the salon
    name: Joi.string().required(),
    category: Joi.array()
        .items(Joi.string().required())
        .min(1)
        .required(),
    description: Joi.string().optional(),
    targetGroup: Joi.array()
        .items(Joi.string().valid('All', 'Men', 'Women', 'Children'))
        .min(1)
        .required(),
    duration: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
});
