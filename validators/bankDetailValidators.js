import Joi from "joi";
import mongoose from "mongoose";

// export const bankValidationSchema = Joi.object({
//   name: Joi.string().required(),
// });

export const bankDetailValidationSchema = Joi.object({
  salon: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid category ID");
      }
      return value;
    })
    .required(),

  accountTitle: Joi.string().required(),

  bank: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid bank ID");
      }
      return value;
    })
    .required(),

  iban: Joi.string().required(),

  bic: Joi.string().required(),
});
