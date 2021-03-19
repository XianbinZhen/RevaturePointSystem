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
  user?: User;

  constructor(private localStorage: LocalStorageService,
    private router: Router, private http: HttpClient) { }

  login(user: User): Observable<User>{
    return this.http.post<User>("http://localhost:8080/login", user);
  }


  register(newEmployee: Employee): Observable<Employee> {
    return this.http.post<Employee>("http://localhost:8080/employee", newEmployee);
  }


  getJwtToken(): string | null {
    console.log("jwt-token", this.localStorage.getItem(this.JWT_TOKEN));
    return this.localStorage.getItem(this.JWT_TOKEN);
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

}
