import express, { Application, Request, Response, NextFunction } from "express";
import { dbConnection } from "./connection/database";
import { config } from "./utils/config";
import logger from "./utils/logger";

const app: Application = express();

app.use(express.json());

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Hello, World!" });
});

dbConnection()
  .then((message) => {
    logger.info(message);
    app.listen(config.port, () =>
      logger.info(
        `Server is up and running on http://${config.host}:${config.port}`
      )
    );
  })
  .catch((error) => {
    logger.error(error);
  });
