import HAPI, { Server, ServerApplicationState } from "@hapi/hapi";
import { authRoutes } from "./auth/routes/auth.router";
import { PORT } from "./config/environment";
import { customerRoutes } from "./customer/routes/customer.router";
import { initDatabase } from "./db/database";
import { corsConig } from "./middlewares/cors-config";
import { rateLimiterMiddleware } from "./middlewares/rate-limiter";
import { welcomeRoutes } from "./shared/routes/welcome.router";
import { transactionRoutes } from "./transaction/routes/transaction.router";
import { setSecurityHeadersMiddleware } from "./middlewares/set-securtiy-headers";
const JWT = require("hapi-auth-jwt2");

export const server: Server = HAPI.server({
  host: "localhost",
  port: PORT,
  routes: {
    cors: corsConig,
  },
});

const registerMiddlewares = (server: Server<ServerApplicationState>) => {
  server.ext("onRequest", rateLimiterMiddleware);
  server.ext("onRequest", setSecurityHeadersMiddleware);
};

const init = async () => {
  // Initialize database connection
  await initDatabase();

  // Register JWT auth plugin
  await server.register(JWT);

  // Register Middlewares Globally
  registerMiddlewares(server);

  server.route(customerRoutes);
  server.route(authRoutes);
  server.route(transactionRoutes);
  server.route(welcomeRoutes);

  await server.start();

  console.log(`Server running on ${server.info.uri}`);

  return server;
};

process.on("unhandledRejection", (error: any, promise) => {
  console.error("##### Unhandled Promise Rejection: #####");
  console.error((error && error.stack) || error);
  console.error(promise);
  throw error;
});

init();
