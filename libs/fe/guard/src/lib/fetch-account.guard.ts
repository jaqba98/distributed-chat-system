// done
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '@distributed-chat-system/fe-system';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import {
  AccountDtoModel,
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import {
  AccountStoreModel,
  setAccount,
} from '@distributed-chat-system/fe-store';

@Injectable({ providedIn: 'root' })
export class FetchAccountGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpUtils,
    private readonly store: Store<{ account: AccountStoreModel }>
  ) {}

  async canActivate() {
    const currentAccount = await firstValueFrom(this.store.select('account'));
    const { account } = currentAccount;
    if (account) return true;
    const dto: TokenDtoModel = {
      token: this.auth.getToken(),
    };
    return await this.http.post<
      TokenDtoModel,
      ResponseDtoModel<AccountDtoModel>,
      boolean
    >(dto, EndpointEnum.fetchAccount, (response) => {
      const { data, success } = response;
      if (success) {
        this.store.dispatch(
          setAccount({
            data: { ...data },
          })
        );
      }
      return true;
    });
  }
}
