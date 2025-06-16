import Joi from "joi";
import mongoose from "mongoose";

export const subscribeBySaloonValidationSchema = Joi.object({
  subscriptionId: Joi.string()
    .custom((value, helpers) => {
      return mongoose.Types.ObjectId.isValid(value)
        ? value
        : helpers.error("any.invalid");
    })
    .required(),

  //   startDate: Joi.date().optional(),

  //   nextBillingDate: Joi.date().optional(),

  active: Joi.boolean().optional(), // defaults to true
  status: Joi.boolean().optional(), // defaults to false
});
