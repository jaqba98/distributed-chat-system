// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import {
  ColumnRoomsEnum,
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
  RoomDtoModel,
  RoomSignInDtoModel,
} from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('roomSignInController')
export class RoomSignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (dto: RoomSignInDtoModel) => {
      const { name, password } = dto;
      const rooms = await this.sqlQuery.select<RoomDtoModel[]>(
        {
          database: DatabaseEnum.rooms,
          table: TableAccountsEnum.rooms,
          scope: ['*'],
          columns: [
            { column: ColumnRoomsEnum.name, value: name },
            { column: ColumnRoomsEnum.password, value: password },
          ],
        },
        pool
      );
      if (rooms.length === 0) {
        this.httpRes.jsonOkMessage('Incorrect room password!', false, res);
        return;
      }
      const token = jwt.sign({ name, jti: uuidv4() }, JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      this.httpRes.jsonOkMessage(token, true, res);
    });
  }
}
