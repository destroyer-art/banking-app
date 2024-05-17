import { ConnectionOptions } from "typeorm";
import path from "path";
import {
  MSSQL_DB,
  MSSQL_HOST,
  MSSQL_PASSWORD,
  MSSQL_PORT,
  MSSQL_USER,
} from "../config/environment";

export const mssqlConfig: ConnectionOptions = {
  type: "mssql",
  name: "default",
  host: MSSQL_HOST,
  port: MSSQL_PORT,
  database: MSSQL_DB,
  username: MSSQL_USER,
  password: MSSQL_PASSWORD,
  entities: [path.join(__dirname, "..", "**/domain/models/*.model.{ts,js}")],
  synchronize: true,
  options: {
    encrypt: false,
  },
};
