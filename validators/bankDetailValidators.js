import Joi from "joi";
import Mongoose from "mongoose";

// export const bankValidationSchema = Joi.object({
//   name: Joi.string().required(),
// });

export const bankDetailValidationSchema = Joi.object({
  accountTitle: Joi.string().required(),

  bank: Joi.string()
    .custom((value, helpers) => {
      if (!Mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid bank ID");
      }
      return value;
    })
    .required(),

  iban: Joi.string().required(),

  bic: Joi.string().required(),
});
