import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {
  loadSelectOptionsFromAPI() {
    return Promise.resolve().then(() => new Promise((resolve) => setTimeout(resolve, 1000)));
  }
}
