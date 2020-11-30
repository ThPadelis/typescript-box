import { Router } from "express";
import { BlockchainController } from "../controllers/models/blockchain.controller";

const router: Router = Router();
export class BlockchainRoutes {
  _blockchainController: BlockchainController;
  constructor() {
    this._blockchainController = new BlockchainController();
  }

  get routes() {
    const controller = this._blockchainController;

    // Fetches all available accounts
    router.get("/accounts", controller.getAccounts);

    // Fetches the balance of the given account address
    router.get("/balance/:account", controller.getAccountBalance);

    // Transfers coins from one account to other
    router.post("/transfer", controller.transfer);

    // Fetches details about a transaction
    router.get("/receipt/:hash", controller.getTransactionReceipt);

    return router;
  }
}
