import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '@distributed-chat-system/fe-system';

@Injectable({ providedIn: 'root' })
export class NotProtectedGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  async canActivate() {
    const response = await lastValueFrom(this.auth.isAuthenticated());
    if (response.success) {
      this.router.navigate(['/rooms']);
      return false;
    }
    return true;
  }
}
