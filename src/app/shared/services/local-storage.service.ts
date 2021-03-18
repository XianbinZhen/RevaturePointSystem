import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage: Storage = window.localStorage;

  constructor() { }

  public setItem(key: string, value: string): void {
    value = JSON.stringify(value);
    this.localStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    let value = this.localStorage.getItem(key);
    if (value == null) {
      return null;
    } else {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
  }
  
  public clear(): void {
    this.localStorage.clear();
  }

}