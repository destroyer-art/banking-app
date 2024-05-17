import Joi from "@hapi/joi";

export const purchaseSchema = Joi.object({
  shoppingProvider: Joi.string().required(),
  amount: Joi.number().required(),
});
