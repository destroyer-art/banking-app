import { ServerRoute } from "@hapi/hapi";
import { loginSchema } from "../schemas/login.schema";
import { login } from "../services/login.service";
// import { extractTokenMiddleware } from "../../middlewares/extract-token";

export const authRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/login",
    handler: login,
    // options: {
    //   validate: {
    //     payload: loginSchema,
    //   },
    //   pre: [{ method: extractTokenMiddleware, assign: "extractToken" }],
    // },
  },
];
