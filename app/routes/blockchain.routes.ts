import { NextFunction, Request, Response, Router } from "express";
import {
  getAccounts,
  getBalance,
  getReceipt,
  transfer,
} from "../connection/blockchain";
import logger from "../utils/logger";

const router: Router = Router();
export class BlockchainRoutes {
  constructor() {}

  get routes() {
    // Fetches all available accounts
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

    // Fetches the balance of the given account address
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

    // Transfer coins from one account to other
    router.post(
      "/transfer",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const { sender = "", recipient = "", amount = "" } = request.body;
          const receipt = await transfer({
            sender,
            receiver: recipient,
            amount,
          });
          response.status(200).json(receipt);
        } catch (error) {
          console.log("ERROR", error);

          next(error);
        }
      }
    );

    router.get(
      "/receipt/:hash",
      async (request: Request, response: Response, next: NextFunction) => {
        try {
          const { hash = "" } = request.params;
          const receipt = await getReceipt(hash);
          response.status(200).json(receipt);
        } catch (error) {
          logger.error(error.message);
          next(error.message);
        }
      }
    );

    return router;
  }
}
