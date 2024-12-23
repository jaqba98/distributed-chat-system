// done
import { Injectable } from '@angular/core';

import { BaseStore } from '@distributed-chat-system/shared-utils';
import { AccountDomainModel } from '../model/account-domain.model';

@Injectable({ providedIn: 'root' })
export class AccountDomainStore extends BaseStore<AccountDomainModel> {}
