import { ServerRoute } from "@hapi/hapi";
import { createCustomerSchema } from "../schemas/create.customer.schema";
import { createCustomer } from "../services/customer.service";

export const customerRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/customers",
    handler: createCustomer,
    options: {
      validate: {
        payload: createCustomerSchema,
      },
    },
  },
];
