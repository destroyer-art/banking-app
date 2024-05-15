import { ServerRoute } from "@hapi/hapi";
import { refundSchema } from "..//schemas/refund.schema";
import { purchase } from "..//services/purchase.service";
import { refund } from "..//services/refund.service";
import { topUp } from "..//services/top-up.service";
import { transfer } from "..//services/transfer.service";
import { purchaseSchema } from "../schemas/purchase.schema";
import { topUpSchema } from "../schemas/top-up.schema";
import { transferSchema } from "../schemas/transfer.schema";

export const transactionRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/top-up",
    handler: topUp,
    options: {
      validate: {
        payload: topUpSchema,
      },
    },
  },
  {
    method: "POST",
    path: "/api/purchase",
    handler: purchase,
    options: {
      validate: {
        payload: purchaseSchema,
      },
    },
  },
  {
    method: "POST",
    path: "/api/refund",
    handler: refund,
    options: {
      validate: {
        payload: refundSchema,
      },
    },
  },
  {
    method: "POST",
    path: "/api/transfer",
    handler: transfer,
    options: {
      validate: {
        payload: transferSchema,
      },
    },
  },
];
