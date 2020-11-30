import { NextFunction, Request, Response, Router } from "express";
import {
  defaultAccount,
  getAccounts,
  getBalance,
} from "../connection/blockchain";
import logger from "../utils/logger";

const router: Router = Router();
export class MeRoutes {
  constructor() {}

  get routes() {
    router.get(
      "/",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const account = await defaultAccount();
          response.status(200).json(account);
        } catch (error) {
          logger.error(error.message);
          console.log(error.error);
          next(error);
        }
      }
    );

    router.get(
      "/accounts",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const accounts = await getAccounts();
          response.status(200).json(accounts);
        } catch (error) {
          logger.error(error.message);
          console.log(error.error);
          next(error);
        }
      }
    );

    router.get(
      "/balance/:account",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const { account = "" } = request.params;
          const balance = await getBalance(account);
          response.status(200).json(balance);
        } catch (error) {
          logger.error(error.message);
          next(error.message);
        }
      }
    );

    return router;
  }
}
