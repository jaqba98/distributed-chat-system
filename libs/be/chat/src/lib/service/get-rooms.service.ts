// done
import { inject, injectable } from 'tsyringe';
import { Server } from 'socket.io';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import {
  DatabaseEnum,
  SqlQueryUtils,
  TableAccountsEnum,
} from '@distributed-chat-system/be-server';
import { SocketsDtoModel } from '@distributed-chat-system/shared-model';
import { SocketDbModel } from '../model/socket-db.model';

@injectable()
export class GetRoomsService {
  constructor(
    @inject(SqlQueryUtils) private readonly sqlQuery: SqlQueryUtils
  ) {}

  async build(io: Server, pool: Pool) {
    const sockets = await this.sqlQuery.select<SocketDbModel[]>(
      {
        database: DatabaseEnum.chat,
        table: TableAccountsEnum.sockets,
        scope: ['*'],
        columns: [],
      },
      pool
    );
    const dto: SocketsDtoModel = {
      sockets: {},
    };

    for (const item of sockets) {
      if (dto.sockets[item.roomName]) {
        if (dto.sockets[item.roomName].accountIds.includes(item.accountId)) {
          continue;
        } else {
          dto.sockets[item.roomName].accountIds.push(item.accountId);
          dto.sockets[item.roomName].counter++;
        }
      } else {
        dto.sockets[item.roomName] = {
          counter: 1,
          accountIds: [item.accountId],
        };
      }
    }
    io.emit('getRoomsResponse', dto);
  }
}
