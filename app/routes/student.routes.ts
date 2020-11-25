import { Router } from "express";
import { StudentController } from "../controllers";

const router: Router = Router();
export class StudentRoutes {
  private _studentController: StudentController;

  constructor() {
    this._studentController = new StudentController();
  }

  get routes() {
    const controller = this._studentController;

    router.get("/", controller.retrive);
    router.post("/", controller.create);

    return router;
  }
}
