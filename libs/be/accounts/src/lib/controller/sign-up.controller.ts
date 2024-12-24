// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  ColumnAccountsUsersEnum,
  DatabaseEnum,
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  RegisterHttp,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import { SignUpDtoModel } from '@distributed-chat-system/shared-model';
import { AccountDbModel } from '../model/account-db.model';
import { validateEmail } from '@distributed-chat-system/shared-utils';

@injectable()
@RegisterHttp('signUpController')
export class SignUpController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (dto: SignUpDtoModel) => {
      const { nick, email, password, rePassword } = dto;
      if (nick.length === 0) {
        this.httpRes.jsonOkMessage('Nickname cannot be empty!', false, res);
        return;
      }
      if (!validateEmail(email)) {
        this.httpRes.jsonOkMessage(
          'Please enter a valid email address!',
          false,
          res
        );
        return;
      }
      if (password.length < 6) {
        this.httpRes.jsonOkMessage(
          'Password must be at least 6 characters long!',
          false,
          res
        );
        return;
      }
      if (password !== rePassword) {
        this.httpRes.jsonOkMessage('Passwords must be the same!', false, res);
        return;
      }
      const accountsByNick = await this.sqlQuery.select<AccountDbModel[]>(
        {
          database: DatabaseEnum.accounts,
          table: TableAccountsEnum.accounts,
          scope: [ColumnAccountsUsersEnum.nick],
          columns: [{ column: ColumnAccountsUsersEnum.nick, value: nick }],
        },
        pool
      );
      if (accountsByNick.length > 0) {
        this.httpRes.jsonOkMessage('Nick is already in use!', false, res);
        return;
      }
      const accountsByEmail = await this.sqlQuery.select<AccountDbModel[]>(
        {
          database: DatabaseEnum.accounts,
          table: TableAccountsEnum.accounts,
          scope: [ColumnAccountsUsersEnum.email],
          columns: [{ column: ColumnAccountsUsersEnum.email, value: email }],
        },
        pool
      );
      if (accountsByEmail.length > 0) {
        this.httpRes.jsonOkMessage('Email is already in use!', false, res);
        return;
      }
      await this.sqlQuery.insert(
        {
          database: DatabaseEnum.accounts,
          table: TableAccountsEnum.accounts,
          scope: [],
          columns: [
            { column: ColumnAccountsUsersEnum.nick, value: nick },
            { column: ColumnAccountsUsersEnum.email, value: email },
            { column: ColumnAccountsUsersEnum.password, value: password },
          ],
        },
        pool
      );
      this.httpRes.jsonOkMessage('Registered successfully!', true, res);
    });
  }
}
