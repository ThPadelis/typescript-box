import express, { Application, json } from "express";
import { BaseRoutes } from "../routes";

export class MiddlewaresBase {
  static get configuration() {
    const app: Application = express();

    app.use(json());

    // Routes
    app.use(new BaseRoutes().routes);

    return app;
  }
}
