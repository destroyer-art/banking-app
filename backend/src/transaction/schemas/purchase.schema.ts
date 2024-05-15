import Joi from "@hapi/joi";

export const purchaseSchema = Joi.object({
  customerId: Joi.string().required(),
  shoppingProvider: Joi.string().required(),
  amount: Joi.number().required(),
});
