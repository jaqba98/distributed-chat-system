import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    const data: TokenDtoModel = { token };
    return this.http.post<ResponseDtoModel>(
      'http://localhost:3000/protected',
      data
    );
  }
}
