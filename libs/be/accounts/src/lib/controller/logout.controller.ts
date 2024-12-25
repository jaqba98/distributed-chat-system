// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  ColumnBlockedTokensEnum,
  DatabaseEnum,
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  RegisterHttp,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import { TokenDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('logoutController')
export class LogoutController implements HttpControllerModel {
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
      await this.sqlQuery.insert(
        {
          database: DatabaseEnum.accounts,
          table: TableAccountsEnum.blockedTokens,
          scope: [],
          columns: [{ column: ColumnBlockedTokensEnum.token, value: token }],
        },
        pool
      );
      this.httpRes.jsonOkMessage('Token blocked!', true, res);
    });
  }
}
