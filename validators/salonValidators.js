// validators/salonValidator.js
import Joi from "joi";
import mongoose from "mongoose";

export const salonSchema = Joi.object({
  name: Joi.string().required(),
  businessEmail: Joi.string().email().allow("", null),
  businessPhone: Joi.string().allow("", null),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    address: Joi.string().required(),
  }).required(),
  businessRegNo: Joi.string().required(),
  gstVatNo: Joi.string().allow("", null),
  teamSize: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.invalid": "Invalid teamSize ID",
    }),
  paymentMode: Joi.string().valid("Cash Only", "Card Only", "Both").required(),
  sameTimingForAllDays: Joi.boolean().required(),

  generalTiming: Joi.object({
    timing: Joi.object({
      start: Joi.string().required(),
      end: Joi.string().required(),
    }).required(),
    lunchBreak: Joi.object({
      start: Joi.string().required(),
      end: Joi.string().required(),
    }).required(),
  }).when("sameTimingForAllDays", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
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
        }).required(),
      })
    )
    .when("sameTimingForAllDays", {
      is: false,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
});
