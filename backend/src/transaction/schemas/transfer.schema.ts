import Joi from "@hapi/joi";

export const transferSchema = Joi.object({
  targetGSMNumber: Joi.string().required(),
  amount: Joi.number().required(),
});

