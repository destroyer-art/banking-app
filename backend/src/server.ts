import HAPI, { Server, ServerApplicationState } from "@hapi/hapi";
import { customerRoutes } from "./customer/routes/customer.router";
import { initDatabase } from "./db/database";
import { welcomeRoutes } from "./routes/welcome.router";
import { transactionRoutes } from "./transaction/routes/transaction.router";
import { PORT } from "./config/environment";
import { rateLimiterMiddleware } from "./middlewares/rate-limiter";
import { corsConig } from "./middlewares/cors-config";
import { authRoutes } from "./auth/routes/auth.router";
import { extractTokenMiddleware } from "./middlewares/extract-token";
const JWT = require("hapi-auth-jwt2");

export const server: Server = HAPI.server({
  host: "localhost",
  port: PORT,
  routes: {
    cors: corsConig,
  },
});

const registerMiddleware = (server: Server<ServerApplicationState>) => {
  // server.ext("onRequest", extractTokenMiddleware);
  server.ext("onRequest", rateLimiterMiddleware);
 };

const init = async () => {
  // Initialize database connection
  await initDatabase();

  // Register JWT auth plugin
  await server.register(JWT);

  registerMiddleware(server);

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
