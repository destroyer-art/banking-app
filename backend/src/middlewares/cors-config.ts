import { WEB_BASE_URL } from "../config/environment";

export const corsConig = {
  origin: [WEB_BASE_URL],
  headers: ["Authorization", "Content-Type"],
  additionalHeaders: ["x-requested-with"],
  exposedHeaders: ["WWW-Authenticate", "Server-Authorization"],
  maxAge: 86400,
  credentials: true,
};
