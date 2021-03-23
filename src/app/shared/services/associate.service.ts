import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  URL = "http://104.154.236.243:8080";

  constructor(private http:HttpClient, private userAuthService: UserAuthService) { }

  options = {
    headers: {
      Authorization: this.userAuthService.getJwtToken()!
    } 
  }

  getAllAssociates() {

    const result = this.http.get(this.URL, this.options);
    return result;
  }

}