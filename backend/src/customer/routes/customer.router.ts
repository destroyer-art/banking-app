import { ServerRoute } from "@hapi/hapi";
import { createCustomerSchema } from "../schemas/create.customer.schema";
import { registerCustomer } from "../services/register-customer.service";
import { getCustomer } from "../services/get-customer.service";

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
    path: "/api/customers/{customerId}",
    handler: getCustomer,
  },
];
