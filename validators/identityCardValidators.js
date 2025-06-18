import Joi from "joi";
import mongoose from "mongoose";

export const identityCardValidationSchema = Joi.object({
  //   images: Joi.string().required(),

  salon: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid category ID");
      }
      return value;
    })
    .required(),
});
