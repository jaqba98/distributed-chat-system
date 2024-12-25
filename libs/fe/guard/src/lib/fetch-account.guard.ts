// done
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '@distributed-chat-system/fe-system';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import {
  AccountDtoModel,
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import { AccountDomainStore } from '@distributed-chat-system/fe-domain';

@Injectable({ providedIn: 'root' })
export class FetchAccountGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpUtils,
    private readonly store: AccountDomainStore
  ) {}

  async canActivate() {
    if (this.store.hasData()) return true;
    const dto: TokenDtoModel = {
      token: this.auth.getToken(),
    };
    return await this.http.post<
      TokenDtoModel,
      ResponseDtoModel<AccountDtoModel>,
      boolean
    >(dto, EndpointEnum.fetchAccount, (response) => {
      const { data } = response;
      this.store.setData({
        id: data.id,
        nick: data.nick,
        email: data.email,
      });
      return true;
    });
  }
}
