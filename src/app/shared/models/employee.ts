import { Prize } from "./prize";

export class Employee {
    employeeId!: number;
    role!: string;
    fname!: string;
    lname!: string;
    username!: string;
    password!: string;
    currentRevaPoints!: number;
    allTimeRevaPoints!: number;
    batchId!: number;
    imgURL!: string;
    prizes!: Prize[];
}