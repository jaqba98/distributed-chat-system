// done
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@distributed-chat-system/fe-system';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import {
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@Injectable({ providedIn: 'root' })
export class NotProtectedGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly http: HttpUtils
  ) {}

  async canActivate() {
    const dto: TokenDtoModel = {
      token: this.auth.getToken(),
    };
    return await this.http.post<
      TokenDtoModel,
      ResponseDtoModel<string>,
      boolean
    >(dto, EndpointEnum.protected, (response) => {
      const { success } = response;
      if (success) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    });
  }
}
