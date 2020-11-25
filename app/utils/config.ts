import { config as dotenv } from "dotenv";

// Load environment variables from .env
dotenv();

const env = process.env.NODE_ENV || "development";
const configurations = {
  base: {
    env,
    name: process.env.APP_NAME || "typescript-box",
    host: process.env.APP_HOST || "127.0.0.1",
    port: process.env.APP_PORT || 8080,
  },
  logging: {
    enable: process.env.LOG_ENABLED || true,
    level: process.env.LOG_LEVEL || "debug",
    prettyPrint: env !== "production",
    // Supply paths to keys to redact sensitive information
    redact: [],
  },
  production: {
    web3_provider_host:
      process.env.PRODUCTION_WEB3_PROVIDER_HOST || "http://127.0.0.1",
    web3_provider_port: process.env.PRODUCTION_WEB3_PROVIDER_PORT || 8545,
    database_connection_string:
      process.env.PRODUCTION_DATABASE_STRING ||
      "mongodb://localhost:27017/typescript-box",
  },
  development: {
    web3_provider_host:
      process.env.DEVELOPMENT_WEB3_PROVIDER_HOST || "http://127.0.0.1",
    web3_provider_port: process.env.DEVELOPMENT_WEB3_PROVIDER_PORT || 8545,
    database_connection_string:
      process.env.DEVELOPMENT_DATABASE_STRING ||
      "mongodb://localhost:27017/typescript-box",
  },
  test: {},
};

export const config = Object.assign(
  configurations.base,
  { logging: configurations.logging },
  env === "development"
    ? { ...configurations.development }
    : { ...configurations.production }
);
