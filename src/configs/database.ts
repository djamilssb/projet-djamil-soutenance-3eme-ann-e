import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_NAME: string | undefined = process.env.DB_NAME;
const DB_PORT: number | undefined = parseInt(process.env.DB_PORT || "", 10);

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

export default connection;
