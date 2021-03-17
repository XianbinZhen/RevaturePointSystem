import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  // SECRET = SECRET
  jwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRhbSBSYW5pZXJpIiwicm9sZSI6ImFkbWluIn0.9gKmSh1qdo6PR2Jjq5-pRusJYWbHYS87QrEs6kKfegk";
  jwtAssoc: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNzb2MgMSIsInJvbGUiOiJhc3NvY2lhdGUifQ.tXjlNiSLRHYaGnWTPPlt0micGZaWFdaBe7BUcEHO0A8";
  constructor() { }

  login(user: User): Observable<String> {
    if(user.name == "admin")
      return of(this.jwt);
    else
      return of(this.jwtAssoc)
  }


  register(user: User): Observable<String> {
    return of(this.jwtAssoc);
  }


}
