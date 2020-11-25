import { Document } from "mongoose";

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  registrationNumber: number;
}
