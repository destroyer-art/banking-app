import Joi from "@hapi/joi";

export const createCustomerSchema = Joi.object({
  email: Joi.string().required(),
  password:Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gsmNumber: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
});
