import Joi from "joi";

export const serviceCategorySchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.boolean().optional(),
});

// export const teamSizeValidationSchema = Joi.object({
//     name: Joi.string().required(),
//   });
