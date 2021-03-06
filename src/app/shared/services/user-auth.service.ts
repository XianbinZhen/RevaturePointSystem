import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  JWT_TOKEN = "JWT_TOKEN_REVATURE_POINT_SYSTEM";
  APP_USER = "REV_POINT_SYS_USER";
  baseURL = 'http://104.154.236.243:8080';
  user?: User;

 


  constructor(private localStorage: LocalStorageService,
    private router: Router, private http: HttpClient) { }

  login(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseURL}/login`, user);
  }


  register(newEmployee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseURL}/employee`, newEmployee);
  }
  
  getEmployeeByID(user: User): Observable<Employee> {
    let options = {
      headers: {
        Authorization: this.getJwtToken()!
      } 
    }
    return this.http.get<Employee>(`${this.baseURL}/employee/${user.employeeId}`, options);
  }


  getJwtToken(): string | null {
    console.log("jwt-token", this.localStorage.getItem(this.JWT_TOKEN));
    return this.localStorage.getItem(this.JWT_TOKEN);
  }

  getUser(): User {
    return JSON.parse(this.localStorage.getItem(this.APP_USER)!);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  logout() {
    this.localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  loadUser() {
    this.user = JSON.parse(this.localStorage.getItem(this.APP_USER)!);
  }

  setUserAndToken(user: User) {
    this.user = user;
    this.localStorage.setItem(this.JWT_TOKEN, user.jwtToken!);
    this.localStorage.setItem(this.APP_USER, JSON.stringify(user));
  }

  isAuthenticated() {
    let user: User =JSON.parse(this.localStorage.getItem(this.APP_USER)!);
    return user.role == "trainer";
  }

  isAssociateAuthenticated() {
    let user: User =JSON.parse(this.localStorage.getItem(this.APP_USER)!);
    return user.role == "associate";
  }

}
