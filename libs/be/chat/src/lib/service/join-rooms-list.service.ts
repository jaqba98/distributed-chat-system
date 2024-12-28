// done
import { inject, injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import {
  SocketControllerModel,
  SqlQueryUtils,
} from '@distributed-chat-system/be-server';
import { GetRoomsService } from './get-rooms.service';

@injectable()
export class JoinRoomsListService implements SocketControllerModel {
  constructor(
    @inject(GetRoomsService) private readonly getRooms: GetRoomsService,
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils
  ) {}

  build(io: Server, socket: Socket, pool: Pool) {
    socket.on('joinRoomsList', async () => {
      this.getRooms.build(io, pool);
    });
  }
}
