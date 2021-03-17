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
    { priceId: 1, name: 'Ipad', cost: 100, description: "New Ipad", employeeId: 0 },
    { priceId: 1, name: 'Ipad', cost: 100, description: "New Ipad", employeeId: 0 },
    { priceId: 1, name: 'Ipad', cost: 100, description: "New Ipad", employeeId: 0 },
    { priceId: 1, name: 'Ipad', cost: 100, description: "New Ipad", employeeId: 0 }
  ]

  constructor() { }

  getAllPrice(): Observable<any> {
    return of(this.prices.slice());
  }
}
