import Joi from "@hapi/joi";

export const refundSchema = Joi.object({
  customerId: Joi.string().required(),
  transactionNumber: Joi.string().required(),
});
