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

@Injectable({ providedIn: 'root' })
export class FetchAccountGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpUtils
  ) {}

  async canActivate() {
    const dto: TokenDtoModel = {
      token: this.auth.getToken(),
    };
    return await this.http.post<
      TokenDtoModel,
      ResponseDtoModel<AccountDtoModel>,
      boolean
    >(dto, EndpointEnum.fetchAccount, (response) => {
      console.log(response);
      return true;
    });
  }
}
