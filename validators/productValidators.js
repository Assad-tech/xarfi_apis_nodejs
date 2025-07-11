import Joi from "joi";
import mongoose from "mongoose";

export const productValidationSchema = Joi.object({
  salon: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid category ID");
      }
      return value;
    })
    .required(),

  name: Joi.string().required(),

  description: Joi.string().required(),

  quantity: Joi.number().integer().min(1).required(),

  price: Joi.number().precision(2).required(),
});
