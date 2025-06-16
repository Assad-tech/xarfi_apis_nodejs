import Joi from "joi";

export const bankValidationSchema = Joi.object({
  name: Joi.string().required(),
});
