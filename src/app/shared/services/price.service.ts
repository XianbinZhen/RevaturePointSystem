import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Price } from '../models/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  url = "http://localhost:8080/prize";

  constructor(private http:HttpClient) { }

  getAllPrice() {
    const headerDict = {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJBZGFtIiwibGFzdE5hbWUiOiJSYW5pZXJpIiwicm9sZSI6ImFzc29jaWF0ZSIsImVtcGxveWVlSWQiOjF9.2LI3VTRZugKOb27f-oAjEK7K1rX7DDTU36zTx6ev4vE',
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const result = this.http.get(this.url, requestOptions);
    return result;
  }
}
