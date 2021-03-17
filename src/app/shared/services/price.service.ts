import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Price } from '../models/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  prices: Price[] = [
    // put mock data here
    { priceId: 1, name: 'Ipad', cost: 100, description: "New Ipad", employeeId: 0 },
    { priceId: 2, name: 'Ipad 2', cost: 200, description: "New Ipad 2", employeeId: 1 },
    { priceId: 3, name: 'Ipad 3', cost: 300, description: "New Ipad 3", employeeId: 0 },
    { priceId: 4, name: 'Ipad 4', cost: 400, description: "New Ipad 4", employeeId: 0 },
    { priceId: 5, name: 'Ipad 5', cost: 600, description: "New Ipad 5", employeeId: 0 }
  ]

  constructor() { }

  getAllPrice(): Observable<Price[]> {
    return of(this.prices.slice());
  }
}
