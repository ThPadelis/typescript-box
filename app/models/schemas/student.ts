import { model, Schema } from "mongoose";
import { IStudent } from "../interfaces/student";

class StudentSchemaClass {
  static get schema() {
    const schema = new Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      registrationNumber: {
        type: Number,
        required: true,
      },
    });
    return schema;
  }
}

export const StudentSchema = model<IStudent>(
  "Students",
  StudentSchemaClass.schema
);
