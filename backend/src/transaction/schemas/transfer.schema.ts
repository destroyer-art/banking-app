import Joi from "@hapi/joi";

export const transferSchema = Joi.object({
  customerId: Joi.string().required(),
  targetGSMNumber: Joi.string().required(),
  amount: Joi.number().required(),
});

