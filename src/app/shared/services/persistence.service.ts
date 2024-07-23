import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('Failed to set data to local storage', error);
    }
  }
    
    get(key: string):unknown
    {
        try {
            return JSON.parse(localStorage.getItem(key) || '{}');
        } catch (error) {
            console.log('Failed to get data from local storage', error);
            return null;
        }
    }
}
