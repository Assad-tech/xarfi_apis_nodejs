import Joi from "joi";
import mongoose from "mongoose";

// Custom validator for MongoDB ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

export const masterValidationSchema = Joi.object({
  //   owner: objectId.required(),

  name: Joi.string().required(),
  // image: Joi.string().required(),

  email: Joi.string().email().required(),
  password: Joi.string().required(),
  access_password: Joi.string().optional().allow(""), // optional field

  experience: Joi.number().required(),

  sameTimingForAllDays: Joi.boolean().default(true),

  generalTiming: Joi.object({
    timing: Joi.object({
      start: Joi.string().required(),
      end: Joi.string().required(),
    }),
    lunchBreak: Joi.object({
      start: Joi.string().required(),
      end: Joi.string().required(),
    }),
  }),

  specificDailyTimings: Joi.array()
    .items(
      Joi.object({
        day: Joi.string()
          .valid(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          )
          .required(),
        open: Joi.boolean().required(),
        timing: Joi.object({
          start: Joi.string().required(),
          end: Joi.string().required(),
        }),
      })
    )
    .optional(),

  services_id: Joi.array().items(objectId).optional(), // optional field

  status: Joi.boolean().optional(),
});
