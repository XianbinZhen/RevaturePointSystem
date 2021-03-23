import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Price } from '../models/price';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  URL = "http://104.154.236.243:8080";

  constructor(private http:HttpClient, private userAuthService: UserAuthService) { }

  options = {
    headers: {
      Authorization: this.userAuthService.getJwtToken()!
    } 
  }

  getAllPrice(): Observable<Price> {

    const result = this.http.get<Price>(`${this.URL}/prize`, this.options);
    return result;
  }
}
