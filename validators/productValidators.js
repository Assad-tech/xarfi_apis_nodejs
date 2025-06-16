import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().required(),

  description: Joi.string().required(),

  quantity: Joi.number().integer().min(1).required(),

  price: Joi.number().precision(2).required(),
});
