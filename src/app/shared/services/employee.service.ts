import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = [
    { employeeId: 1, role: "admin", fname: "Adam", lname: "Ranieri", username: "adam", password: "adam",
      currentRevaPoints: 9999, allTimeRevaPoints: 9999, batchId: 0}, 
    { employeeId: 2, role: "associate", fname: "Assoc1", lname: "Ranieri", username: "assoc1", password: "adam",
      currentRevaPoints: 200, allTimeRevaPoints: 600, batchId: 1}, 
    { employeeId: 3, role: "associate", fname: "Assoc2", lname: "Ranieri", username: "assoc2", password: "adam",
      currentRevaPoints: 500, allTimeRevaPoints: 500, batchId: 1}, 
    { employeeId: 4, role: "associate", fname: "Assoc3", lname: "Ranieri", username: "assoc3", password: "adam",
      currentRevaPoints: 100, allTimeRevaPoints: 300, batchId: 2}, 
    { employeeId: 5, role: "associate", fname: "Assoc 4", lname: "Ranieri", username: "assoc4", password: "adam",
      currentRevaPoints: 0, allTimeRevaPoints: 0, batchId: 0}, 
  ];

  constructor() { }

  getAllEmployees(): Observable<Employee[]> {
    return of(this.employees.slice());
  }

}
