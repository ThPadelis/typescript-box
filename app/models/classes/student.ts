import { IStudent } from "../interfaces/student";

export class Student {
  private _student: IStudent;

  constructor(student: IStudent) {
    this._student = student;
  }

  get firstName(): string {
    return this._student.firstName;
  }

  get lastName(): string {
    return this._student.lastName;
  }

  get email(): string {
    return this._student.email;
  }

  get registrationNumber(): number {
    return this._student.registrationNumber;
  }
}
