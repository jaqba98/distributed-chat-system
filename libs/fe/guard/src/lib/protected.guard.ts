import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '@distributed-chat-system/fe-system';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  async canActivate() {
    const response = await lastValueFrom(this.auth.isAuthenticated());
    if (response.success) {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }
}
