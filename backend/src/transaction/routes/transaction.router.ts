import { ServerRoute } from "@hapi/hapi";
import { extractTokenMiddleware } from "../../middlewares/extract-token";
import { purchaseSchema } from "../schemas/purchase.schema";
import { refundSchema } from "../schemas/refund.schema";
import { topUpSchema } from "../schemas/top-up.schema";
import { transferSchema } from "../schemas/transfer.schema";
import { purchase } from "../services/purchase.service";
import { refund } from "../services/refund.service";
import { topUp } from "../services/top-up.service";
import { transfer } from "../services/transfer.service";

export const transactionRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/top-up",
    handler: topUp,
    options: {
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
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
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
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
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
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
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
      validate: {
        payload: transferSchema,
      },
    },
  },
];
