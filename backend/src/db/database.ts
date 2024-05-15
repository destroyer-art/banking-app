import { DataSource } from "typeorm";
// import { postgresConfig } from "./postgres-connection.options";
import { mssqlConfig } from "./mssql-connection.options";

export const appDataSource = new DataSource(mssqlConfig);

export const initDatabase = async () => {
  try {
    await appDataSource.initialize();

    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
};
