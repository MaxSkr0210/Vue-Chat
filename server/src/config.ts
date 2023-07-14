import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const appConfig = {
  PORT: process.env.PORT || 3000,
};

export const corsConfig = {
  origin: JSON.parse(process.env.ORIGIN as string) || "*",
  credentials: true,
};

export const DBConfig = {
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export const NODE_ENV = process.env.ENVIRONMENT;
