// done
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoomTokenService {
  saveToken(token: string | null) {
    if (token === null) return;
    localStorage.setItem('roomToken', token);
  }

  getToken() {
    return localStorage.getItem('roomToken');
  }
}
