import Joi from "@hapi/joi";

export const topUpSchema = Joi.object({
  customerId: Joi.string().required(),
  paymentProvider: Joi.string().required(),
  amount: Joi.number().required(),
});
