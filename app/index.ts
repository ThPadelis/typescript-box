import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "./utils/config";

const app: Application = express();

app.use(express.json());

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Hello, World!" });
});

app.listen(config.port, () => {
  console.log(
    `Server is up and running on http://${config.host}:${config.port}`
  );
});
