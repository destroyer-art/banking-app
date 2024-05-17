import Joi from "@hapi/joi";

export const refundSchema = Joi.object({
  transactionNumber: Joi.string().required(),
});
