import { Student } from "./student.model";

export class Laptop {
  lno: number;
  lname: string;
  serialno: string; // Ensure consistency in the naming
  
  // Reference to the Student class
// student: Student ;

  constructor(lno: number, lname: string, serialno: string) {
    this.lno = lno;
    this.lname = lname;
    this.serialno = serialno;
 // this.student = student;
  }
}
