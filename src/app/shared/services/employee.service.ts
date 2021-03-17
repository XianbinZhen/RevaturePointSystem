import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = [
    { employeeId: 1, role: "admin", fname: "Adam", lname: "Ranieri", username: "adam", password!: "adam",
      currentRevaPoints: 9999, allTimeRevaPoints: 9999, batchId: 0}, 
    { employeeId: 1, role: "admin", fname: "Adam", lname: "Ranieri", username: "adam", password!: "adam",
      currentRevaPoints: 9999, allTimeRevaPoints: 9999, batchId: 0}, 
    { employeeId: 1, role: "admin", fname: "Adam", lname: "Ranieri", username: "adam", password!: "adam",
      currentRevaPoints: 9999, allTimeRevaPoints: 9999, batchId: 0}, 
    { employeeId: 1, role: "admin", fname: "Adam", lname: "Ranieri", username: "adam", password!: "adam",
      currentRevaPoints: 9999, allTimeRevaPoints: 9999, batchId: 0}, 
    { employeeId: 1, role: "admin", fname: "Adam", lname: "Ranieri", username: "adam", password!: "adam",
      currentRevaPoints: 9999, allTimeRevaPoints: 9999, batchId: 0}, 
  ];

  constructor() { }

  getAllEmployees(): Observable<any> {
    return of(this.employees.slice());
  }

}
