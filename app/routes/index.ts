import express, { Application, NextFunction, Request, Response } from "express";
import { BlockchainRoutes } from "./blockchain.routes";
import { StudentRoutes } from "./student.routes";

const app: Application = express();

export class BaseRoutes {
  get routes() {
    app.use("/students", new StudentRoutes().routes);
    app.use("/", new BlockchainRoutes().routes);
    return app;
  }
}
