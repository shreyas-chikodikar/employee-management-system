import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  title = signal<String>('');

  constructor() {}

  setData(data: String) {
    this.title.update(() => data);
  }

  getData() {
    return this.title();
  }
}
