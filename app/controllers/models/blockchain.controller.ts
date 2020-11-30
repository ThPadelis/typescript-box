import { NextFunction, Request, Response } from "express";
import {
  getAccounts,
  getBalance,
  getReceipt,
  transfer,
} from "../../connection/blockchain";
import logger from "../../utils/logger";

export class BlockchainController {
  async getAccounts(request: Request, response: Response, next: NextFunction) {
    try {
      const accounts = await getAccounts();
      response.status(200).json(accounts);
    } catch (error) {
      logger.error(error.message);
      console.log(error.error);
      next(error);
    }
  }

  async getAccountBalance(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { account = "" } = request.params;
      const balance = await getBalance(account);
      response.status(200).json(balance);
    } catch (error) {
      logger.error(error.message);
      next(error.message);
    }
  }

  async transfer(request: Request, response: Response, next: NextFunction) {
    try {
      const { sender = "", receiver = "", amount = "" } = request.body;
      const receipt = await transfer({
        sender,
        receiver,
        amount,
      });
      response.status(200).json(receipt);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionReceipt(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { hash = "" } = request.params;
      const receipt = await getReceipt(hash);
      response.status(200).json(receipt);
    } catch (error) {
      logger.error(error.message);
      next(error.message);
    }
  }
}
