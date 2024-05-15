import HAPI, { Server } from "@hapi/hapi";
import { customerRoutes } from "./customer/routes/customer.router";
import { initDatabase } from "./db/database";
import { welcomeRoutes } from "./routes/welcome.router";
import { transactionRoutes } from "./transaction/routes/transaction.router";

export const server: Server = HAPI.server({
  host: "localhost",
  port: 3000,
});

const init = async () => {
  await initDatabase(); // Initialize database connection

  server.route(customerRoutes);
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
