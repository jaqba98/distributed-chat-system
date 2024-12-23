// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import {
  ColumnAccountsUsersEnum,
  DatabaseEnum,
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  JWT_SECRET_KEY,
  RegisterHttp,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import { SignInDtoModel } from '@distributed-chat-system/shared-model';
import { AccountDbModel } from '../model/account-db.model';

@injectable()
@RegisterHttp('signInController')
export class SignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (dto: SignInDtoModel) => {
      const { email, password } = dto;
      const accounts = await this.sqlQuery.select<AccountDbModel[]>(
        {
          database: DatabaseEnum.accounts,
          table: TableAccountsEnum.accounts,
          scope: ['*'],
          conditions: [
            { column: ColumnAccountsUsersEnum.email, value: email },
            { column: ColumnAccountsUsersEnum.password, value: password },
          ],
        },
        pool
      );
      if (accounts.length === 0) {
        this.httpRes.jsonOkMessage('Incorrect email or password!', false, res);
        return;
      }
      const token = jwt.sign({ email, jti: uuidv4() }, JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      this.httpRes.jsonOkMessage(token, true, res);
    });
  }
}
