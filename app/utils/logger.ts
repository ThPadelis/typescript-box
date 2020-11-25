import { existsSync, mkdirSync } from "fs";
import { createLogger, format, transports, Logger } from "winston";
const { combine, timestamp, printf } = format;

const formatter = printf(({ level, message, timestamp }) => {
  if (typeof message === "object" && message !== null)
    return `${timestamp} [${level}]: ${JSON.stringify(message, null, 2)}\n`;
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
  // defaultMeta: { service: "user-service" },
  transports: [
    new transports.Console({ format: format.colorize({ all: true }) }),
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({
      filename: `${pathToLogs}/error.log`,
      level: "error",
    }),
    new transports.File({ filename: `${pathToLogs}/combined.log` }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new transports.Console({
//       format: format.simple(),
//     })
//   );
// }

export default logger;
