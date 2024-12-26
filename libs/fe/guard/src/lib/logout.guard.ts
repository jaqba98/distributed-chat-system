// done
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '@distributed-chat-system/fe-system';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import {
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import {
  AccountStoreModel,
  clearAccount,
} from '@distributed-chat-system/fe-store';

@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly http: HttpUtils,
    private readonly store: Store<{ account: AccountStoreModel }>
  ) {}

  async canActivate() {
    const dto: TokenDtoModel = {
      token: this.auth.getToken(),
    };
    return await this.http.post<
      TokenDtoModel,
      ResponseDtoModel<string>,
      boolean
    >(dto, EndpointEnum.logout, (response) => {
      const { success } = response;
      if (success) {
        this.store.dispatch(clearAccount());
        this.router.navigate(['/sign-in']);
        return false;
      }
      return true;
    });
  }
}
