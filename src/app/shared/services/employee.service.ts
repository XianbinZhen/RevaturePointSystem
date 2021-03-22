import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL = "http://localhost:8080";

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

}