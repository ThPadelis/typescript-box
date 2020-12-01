import { existsSync, mkdirSync } from "fs";
import { createLogger, format, transports, Logger } from "winston";
const { combine, timestamp, printf } = format;

const formatter = printf(({ level, message, timestamp }) => {
  if (typeof message === "object" && message !== null)
    return `${timestamp} [${level}]: ${JSON.stringify(message, null, 2)}`;
  else return `${timestamp} [${level}]: ${message}`;
});

// Create logs folder if not exists
const pathToLogs = "app/logs";

if (!existsSync(pathToLogs)) {
  mkdirSync(pathToLogs);
}

const logger: Logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), formatter),
  transports: [
    new transports.Console({ format: format.colorize({ all: true }) }),
    new transports.File({
      filename: `${pathToLogs}/error.log`,
      level: "error",
    }),
    new transports.File({ filename: `${pathToLogs}/combined.log` }),
  ],
});

export default logger;
