import Joi from "joi";
import mongoose from "mongoose";

// Custom validator for MongoDB ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

export const styleValidationSchema = Joi.object({
  //   images: Joi.string().required(),

  name: Joi.string().required(),

  master: Joi.array().items(objectId).optional(),
});
