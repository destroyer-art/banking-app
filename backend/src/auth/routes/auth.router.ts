import { ServerRoute } from "@hapi/hapi";
import { loginSchema } from "../schemas/login.schema";
import { login } from "../services/login.service";
import { register } from "../services/register.service";
import { registerSchema } from "../schemas/register.schema";
import { Routes } from "../../shared/routes/routes";

const prefix = "/api/auth/";

export const authRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: `${prefix}${Routes.LOGIN}`,
    handler: login,
    options: {
      validate: {
        payload: loginSchema,
      },
    },
  },

  {
    method: "POST",
    path: `${prefix}${Routes.REGISTER}`,
    handler: register,
    options: {
      validate: {
        payload: registerSchema,
      },
    },
  },
];
