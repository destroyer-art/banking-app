import { ConnectionOptions } from "typeorm";
import path from "path";
import {
  DATABASE_DB,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from "../config/environment";


export const mssqlConfig: ConnectionOptions = {
  type: "mssql",
  name: "default",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_DB,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  entities: [path.join(__dirname, "..", "**/domain/models/*.model.{ts,js}")],
  synchronize: true,
  options: {
    encrypt: false,
  },
};
