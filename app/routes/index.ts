import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

export class BaseRoutes {
  get routes() {
    app.use("/", (request: Request, response: Response, next: NextFunction) => {
      response.json({ message: "Hello, World!" });
    });

    return app;
  }
}
