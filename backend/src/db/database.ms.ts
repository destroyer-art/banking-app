import sql, { ConnectionPool } from "mssql";
import path from "path";
import {
  MSSQL_DB,
  MSSQL_HOST,
  MSSQL_PASSWORD,
  MSSQL_PORT,
  MSSQL_USER,
} from "../config/environment";

const config = {
  server: MSSQL_HOST,
  port: MSSQL_PORT,
  database: MSSQL_DB,
  user: MSSQL_USER,
  password: MSSQL_PASSWORD,
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
