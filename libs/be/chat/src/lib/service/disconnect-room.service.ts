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

@injectable()
export class DisconnectRoomService implements SocketControllerModel {
  constructor(
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils,
    @inject(GetRoomsService) private readonly getRooms: GetRoomsService
  ) {}

  build(io: Server, socket: Socket, pool: Pool) {
    socket.on('disconnect', async () => {
      const sockets = await this.sqlQuery.select<SocketDbModel[]>(
        {
          database: DatabaseEnum.chat,
          table: TableAccountsEnum.sockets,
          scope: ['*'],
          columns: [{ column: ColumnSocketsEnum.socketId, value: socket.id }],
        },
        pool
      );
      if (sockets.length > 0) {
        await this.sqlQuery.delete(
          {
            database: DatabaseEnum.chat,
            table: TableAccountsEnum.sockets,
            scope: [],
            columns: [{ column: ColumnSocketsEnum.socketId, value: socket.id }],
          },
          pool
        );
        const currSocket = sockets[0];
        socket.leave(currSocket.roomName);
        this.getRooms.build(io, pool);
      }
    });
  }
}
