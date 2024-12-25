// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import { verify } from 'jsonwebtoken';

import {
  ColumnBlockedTokensEnum,
  DatabaseEnum,
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  JWT_SECRET_KEY,
  RegisterHttp,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import { TokenDtoModel } from '@distributed-chat-system/shared-model';
import { BlockedTokenDbModel } from '../model/blocked-token-db.model';

@injectable()
@RegisterHttp('protectedController')
export class ProtectedController implements HttpControllerModel {
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
      const blockedTokens = await this.sqlQuery.select<BlockedTokenDbModel[]>(
        {
          database: DatabaseEnum.accounts,
          table: TableAccountsEnum.blockedTokens,
          scope: [ColumnBlockedTokensEnum.token],
          columns: [{ column: ColumnBlockedTokensEnum.token, value: token }],
        },
        pool
      );
      if (blockedTokens.length > 0) {
        this.httpRes.jsonOkMessage('Token has expired!', false, res);
        return;
      }
      try {
        verify(token, JWT_SECRET_KEY);
        this.httpRes.jsonOkMessage('Token correct!', true, res);
        return;
      } catch {
        this.httpRes.jsonOkMessage('Invalid token!', false, res);
        return;
      }
    });
  }
}
