import { ConnectionOptions } from "typeorm";

import path from "path";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "../config/environment";

export const postgresConfig: ConnectionOptions = {
  type: "postgres",
  name: "default",
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: [path.join(__dirname, "..", "**/domain/models/*.model.{ts,js}")],
  synchronize: true,
};
