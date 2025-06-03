// validators/teamSizeValidators.js
import Joi from "joi";

export const teamSizeValidationSchema = Joi.object({
  name: Joi.string().required(),
});
