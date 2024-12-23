import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  saveToken(token: string | null) {
    if (token === null) return;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    const data: TokenDtoModel = { token };
    return this.http.post<ResponseDtoModel<string>>(
      'http://localhost:3002/protected',
      data
    );
  }

  logout() {
    const token = this.getToken();
    const data: TokenDtoModel = { token };
    return this.http.post<ResponseDtoModel<string>>(
      'http://localhost:3002/logout',
      data
    );
  }
}
