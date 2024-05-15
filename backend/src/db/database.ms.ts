import sql, { ConnectionPool } from "mssql";
import path from "path";
import {
  DATABASE_DB,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from "../config/environment";

const config = {
  server: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_DB,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  options: {
    encrypt: false,
    entities: [path.join(__dirname, "..", "**/domain/models/*.model.{ts,js}")],
    synchronize: true,
  },
};

console.log({ config });

let pool: ConnectionPool;

export const connectToDatabaseMS = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (error) {
    console.error("Error connecting to SQL Server:", error);
  }
};

export const getPool = () => pool;
