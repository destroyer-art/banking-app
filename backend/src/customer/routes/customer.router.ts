import { ServerRoute } from "@hapi/hapi";
import { extractTokenMiddleware } from "../../middlewares/extract-token";
import { getCustomer } from "../services/get-customer.service";
import { Routes } from "../../shared/routes/routes";

const prefix = "/api/";

export const customerRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: `${prefix}${Routes.CUSTOMERS}`,
    handler: getCustomer,
    options: {
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
    },
  },
];
