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
import { Routes } from "../../shared/routes/routes";

const prefix = "/api/";

export const transactionRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: `${prefix}${Routes.TOP_UP}`,
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
    path: `${prefix}${Routes.PURCHASE}`,
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
    path: `${prefix}${Routes.REFUND}`,
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
    path: `${prefix}${Routes.TRANSFER}`,
    handler: transfer,
    options: {
      pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
      validate: {
        payload: transferSchema,
      },
    },
  },
];
