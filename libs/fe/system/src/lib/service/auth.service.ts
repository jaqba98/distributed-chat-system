import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
