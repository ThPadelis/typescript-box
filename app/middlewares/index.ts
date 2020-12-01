import express, {
  Application,
  json,
  Request,
  Response,
  NextFunction,
} from "express";
import { BaseRoutes } from "../routes";
import cors from "cors";

export class MiddlewaresBase {
  static get configuration() {
    const app: Application = express();

    app.use(json());
    app.use(cors());

    // Routes
    app.use(new BaseRoutes().routes);
    // Error handler
    app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        return response.status(400).json(error);
      }
    );

    return app;
  }
}
