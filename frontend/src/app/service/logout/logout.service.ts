import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor() {}

  logout(): void {
    window.localStorage.removeItem('auth_token');
  }
}
