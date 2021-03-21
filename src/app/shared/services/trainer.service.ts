import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prize } from '../models/prize';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  URL = "http://localhost:8080";

  options = {
    headers: {
      Authorization: this.userAuthService.getJwtToken()!
    } 
  }

  constructor(private http : HttpClient, private userAuthService: UserAuthService) { }


  addPrize(prize: Prize): Observable<Prize> {
    return this.http.post<Prize>(`${this.URL}/prize`, prize, this.options);
  }

  getPrize(prize: Prize): Observable<Prize> {
    return this.http.get<Prize>(`${this.URL}/prize`, this.options);
  }


}
