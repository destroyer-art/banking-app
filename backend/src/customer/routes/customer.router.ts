import { ServerRoute } from "@hapi/hapi";
import { createCustomerSchema } from "../schemas/register.customer.schema";
import { getCustomer } from "../services/get-customer.service";
import { registerCustomer } from "../services/register-customer.service";
import { extractTokenMiddleware } from "../../middlewares/extract-token";

export const customerRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/customers",
    handler: registerCustomer,
    options: {
      validate: {
        payload: createCustomerSchema,
      },
    },
  },

  {
    method: "GET",
    path: "/api/customers",
    handler: getCustomer,
    options: {
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
    },
  },
];
