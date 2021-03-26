import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { Prize } from '../models/prize';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL = "http://104.154.236.243:8080";

  options = {
    headers: {
      Authorization: this.userAuthService.getJwtToken()!
    } 
  }
  
  constructor(private userAuthService: UserAuthService,
    private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/employee`, this.options);
  }

  getAllAssociates(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/role/associate`, this.options);
  }
  getLoggedInEmployee(): Observable<Employee>{
    return this.http.get<Employee>(`${this.URL}/employee/${this.userAuthService.getUser().employeeId}`, this.options);
  }
  getLoggedInEmployeeBatch(emp:Employee): Observable<Employee[]>{
    
    return this.http.get<Employee[]>(`${this.URL}/batch/${emp.batchId}`, this.options);
  }

  getAllAssociatesByBatch(id:Number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/batch/` + id, this.options);
  }

  updateAssociateById(prize: Prize): void{

    const tempEmployee = this.getLoggedInEmployee().subscribe((result) =>{
      let tempEmployee = result;
      tempEmployee.prizes.push(prize)
      this.http.put<Employee>(`${this.URL}/employee/${tempEmployee.employeeId}`, tempEmployee, this.options);
    });

  }
}