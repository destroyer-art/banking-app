import HAPI, { Server } from "@hapi/hapi";
import { customerRoutes } from "./customer/routes/customer.router";
import { initDatabase } from "./db/database";
import { welcomeRoutes } from "./routes/welcome.router";
import { transactionRoutes } from "./transaction/routes/transaction.router";
import { PORT } from "./config/environment";

export const server: Server = HAPI.server({
  host: "localhost",
  port: PORT,
  "routes": {
    "cors": {
        "origin": ["http://localhost:5173"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
    }
}
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
