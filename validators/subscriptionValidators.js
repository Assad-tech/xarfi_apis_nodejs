import Joi from "joi";

export const subscriptionValidationSchema = Joi.object({
  planType: Joi.string().valid("monthly", "yearly").required(),

  price: Joi.number().positive().required(),

  description: Joi.string().min(3).required(),

  status: Joi.boolean().optional(),
});
