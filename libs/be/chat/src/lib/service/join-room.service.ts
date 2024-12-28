// done
import { inject, injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import {
  ColumnSocketsEnum,
  DatabaseEnum,
  SocketControllerModel,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import { GetRoomsService } from './get-rooms.service';
import { SocketDbModel } from '../model/socket-db.model';
import { JoinRoomModel } from '@distributed-chat-system/shared-model';

@injectable()
export class JoinRoomService implements SocketControllerModel {
  constructor(
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(GetRoomsService) private readonly getRooms: GetRoomsService
  ) {}

  build(io: Server, socket: Socket, pool: Pool) {
    socket.on('joinRoom', async (dto: JoinRoomModel) => {
      const sockets = await this.sqlQuery.select<SocketDbModel[]>(
        {
          database: DatabaseEnum.chat,
          table: TableAccountsEnum.sockets,
          scope: ['*'],
          columns: [{ column: ColumnSocketsEnum.socketId, value: socket.id }],
        },
        pool
      );
      if (sockets.length === 0) {
        await this.sqlQuery.insert(
          {
            database: DatabaseEnum.chat,
            table: TableAccountsEnum.sockets,
            scope: [],
            columns: [
              { column: ColumnSocketsEnum.socketId, value: socket.id },
              { column: ColumnSocketsEnum.roomName, value: dto.roomName },
              {
                column: ColumnSocketsEnum.accountId,
                value: dto.accountId.toString(),
              },
            ],
          },
          pool
        );
        socket.join(dto.roomName);
        this.getRooms.build(io, pool);
      }
    });
  }
}
