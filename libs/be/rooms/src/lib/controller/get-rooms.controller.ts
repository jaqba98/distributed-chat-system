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
import { RoomDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('getRoomsController')
export class GetRoomsController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  async build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    const rooms = await this.sqlQuery.select<RoomDtoModel[]>(
      {
        database: DatabaseEnum.rooms,
        table: TableAccountsEnum.rooms,
        scope: [ColumnRoomsEnum.name, ColumnRoomsEnum.ownerNick],
        columns: [],
      },
      pool
    );
    this.httpRes.jsonOk<RoomDtoModel[]>(rooms, true, res);
  }
}
