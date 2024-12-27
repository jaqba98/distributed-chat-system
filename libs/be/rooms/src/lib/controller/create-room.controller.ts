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
@RegisterHttp('createRoomController')
export class CreateRoomController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (dto: Omit<RoomDtoModel, 'id'>) => {
      const { name, password, ownerId, ownerNick } = dto;
      if (name.length === 0) {
        this.httpRes.jsonOkMessage('Name cannot be empty!', false, res);
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
      const roomByName = await this.sqlQuery.select<RoomDtoModel[]>(
        {
          database: DatabaseEnum.rooms,
          table: TableAccountsEnum.rooms,
          scope: [ColumnRoomsEnum.name],
          columns: [{ column: ColumnRoomsEnum.name, value: name }],
        },
        pool
      );
      if (roomByName.length > 0) {
        this.httpRes.jsonOkMessage('Name is already in use!', false, res);
        return;
      }
      await this.sqlQuery.insert(
        {
          database: DatabaseEnum.rooms,
          table: TableAccountsEnum.rooms,
          scope: [],
          columns: [
            { column: ColumnRoomsEnum.name, value: name },
            { column: ColumnRoomsEnum.password, value: password },
            { column: ColumnRoomsEnum.ownerId, value: ownerId.toString() },
            { column: ColumnRoomsEnum.ownerNick, value: ownerNick },
          ],
        },
        pool
      );
      this.httpRes.jsonOkMessage('Room created!', true, res);
    });
  }
}
