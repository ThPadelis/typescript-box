import express, { Application, Request, Response, NextFunction } from "express";
import { dbConnection } from "./connection/database";
import { MiddlewaresBase as Middlewares } from "./middlewares";
import { config } from "./utils/config";
import logger from "./utils/logger";

// Application
const app: Application = express();

// Middlewares
app.use(Middlewares.configuration);

// Launch application
dbConnection()
  .then((message) => {
    logger.info(message);
    app.listen(config.port, () =>
      logger.info(
        `API server listening on http://${config.host}:${config.port}, in ${config.env} mode`
      )
    );
  })
  .catch((error) => {
    logger.error(error);
  });
