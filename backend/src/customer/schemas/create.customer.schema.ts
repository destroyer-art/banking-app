import Joi from "@hapi/joi";

export const createCustomerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gsmNumber: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
});
