import express, { Application, Request, Response, NextFunction } from "express";

const app = express();

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Hello, World!" });
});

app.listen(8080, () =>
  console.log("Server is up and running on http://localhost:8080")
);
