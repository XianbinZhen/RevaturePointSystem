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
  APP_USER = "EGRET_USER";
  user?: User;
  token: string = "";
  isAuthenticated: boolean = false;


  // SECRET = SECRET
  jwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRhbSBSYW5pZXJpIiwicm9sZSI6ImFkbWluIn0.9gKmSh1qdo6PR2Jjq5-pRusJYWbHYS87QrEs6kKfegk";
  jwtAssoc: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNzb2MgMSIsInJvbGUiOiJhc3NvY2lhdGUifQ.tXjlNiSLRHYaGnWTPPlt0micGZaWFdaBe7BUcEHO0A8";
  
  constructor(private localStorage: LocalStorageService,
    private router: Router) { }

  login(user: User): Observable<string> {
    if(user.name == "admin")
      return of(this.jwt);
    else
      return of(this.jwtAssoc)
  }


  register(newEmployee: Employee): Observable<String> {
    return of(this.jwtAssoc);
  }


  getJwtToken(): string | null {
    return this.localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean {
    console.log("jwt token in localstorage ", this.getJwtToken());
    
    return !!this.getJwtToken();
  }

  logout() {
    this.localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  setUserAndToken(token: string, user: User, isAuthenticated: boolean) {
    this.token = token;
    this.user = user;
    this.isAuthenticated = isAuthenticated;
    this.localStorage.setItem(this.JWT_TOKEN, token);
    this.localStorage.setItem(this.APP_USER, JSON.stringify(user));
  }

}
