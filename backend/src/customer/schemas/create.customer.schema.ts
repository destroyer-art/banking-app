import Joi from "@hapi/joi";

export const createCustomerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gsmNumber: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
});
