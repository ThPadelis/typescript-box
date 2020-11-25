import { NextFunction, Request, Response } from "express";
import { Student } from "../../models";
import { IStudent } from "../../models/interfaces/student";
import logger from "../../utils/logger";

export class StudentController {
  async retrive(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const students: IStudent[] = await Student.find();
      logger.info({ students });
      response.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const doc: IStudent = <IStudent>request.body;

      const student = await new Student(doc).save();
      logger.info({ ...student, message: "Student created" });
      response.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }
}
