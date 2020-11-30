import express, { Application, NextFunction, Request, Response } from "express";
import { MeRoutes } from "./me.routes";
import { StudentRoutes } from "./student.routes";

const app: Application = express();

export class BaseRoutes {
  get routes() {
    app.use("/students", new StudentRoutes().routes);
    app.use("/me", new MeRoutes().routes);
    return app;
  }
}
