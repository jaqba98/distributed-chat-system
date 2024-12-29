// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  ColumnRoomsEnum,
  DatabaseEnum,
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  RegisterHttp,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import {
  RoomAccessDtoModel,
  RoomDtoModel,
} from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('roomAccessController')
export class RoomAccessController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  async build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (dto: RoomAccessDtoModel) => {
      const rooms = await this.sqlQuery.select<RoomDtoModel[]>(
        {
          database: DatabaseEnum.rooms,
          table: TableAccountsEnum.rooms,
          scope: ['*'],
          columns: [
            { column: ColumnRoomsEnum.name, value: dto.roomName },
            { column: ColumnRoomsEnum.password, value: dto.password },
          ],
        },
        pool
      );
      if (rooms.length > 0) {
        this.httpRes.jsonOkMessage('success', true, res);
        return;
      }
      this.httpRes.jsonOkMessage('error', false, res);
    });
  }
}
