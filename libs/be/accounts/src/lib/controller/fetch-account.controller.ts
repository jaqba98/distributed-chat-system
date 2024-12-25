// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import {
  ColumnAccountsEnum,
  DatabaseEnum,
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  JWT_SECRET_KEY,
  RegisterHttp,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import {
  AccountDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';
import { TokenDataModel } from '../model/token-data.model';
import { AccountDbModel } from '../model/account-db.model';

@injectable()
@RegisterHttp('fetchAccountController')
export class FetchAccountController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (dto: TokenDtoModel) => {
      const { token } = dto;
      if (!token) {
        this.httpRes.jsonOkMessage('Invalid token!', false, res);
        return;
      }
      try {
        const tokenData = verify(token, JWT_SECRET_KEY);
        if (typeof tokenData === 'string') {
          this.httpRes.jsonOkMessage('Invalid token!', false, res);
          return;
        }
        const { email } = tokenData as TokenDataModel;
        const accounts = await this.sqlQuery.select<AccountDbModel[]>(
          {
            database: DatabaseEnum.accounts,
            table: TableAccountsEnum.accounts,
            scope: ['*'],
            columns: [{ column: ColumnAccountsEnum.email, value: email }],
          },
          pool
        );
        if (accounts.length === 0) {
          this.httpRes.jsonOkMessage('Invalid token!', false, res);
          return;
        }
        const account = accounts[0];
        const dto: AccountDtoModel = {
          id: account.id,
          nick: account.nick,
          email: account.email,
        };
        this.httpRes.jsonOk<AccountDtoModel>(dto, true, res);
        return;
      } catch {
        this.httpRes.jsonOkMessage('Invalid token!', false, res);
        return;
      }
    });
  }
}
