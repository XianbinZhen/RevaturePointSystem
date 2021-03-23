import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectBatchIdService {

  id:number = 0;

  constructor() { }

  public setID(id:number):void {
    this.id = id;
  }
}
