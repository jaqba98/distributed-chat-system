// done
import { inject, injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import {
  RegisterSocket,
  SocketControllerModel,
} from '@distributed-chat-system/be-server';
import { JoinRoomService } from '../service/join-room.service';
import { DisconnectRoomService } from '../service/disconnect-room.service';
import { MessageService } from '../service/message.service';
import { JoinRoomsListService } from '../service/join-rooms-list.service';

@injectable()
@RegisterSocket('socketIOController')
export class SocketIOController implements SocketControllerModel {
  constructor(
    @inject(JoinRoomService) private readonly joinRoom: JoinRoomService,
    @inject(DisconnectRoomService)
    private readonly disconnectRoom: DisconnectRoomService,
    @inject(JoinRoomsListService)
    private readonly joinRoomsList: JoinRoomsListService,
    @inject(MessageService) private message: MessageService
  ) {}

  build(io: Server, socket: Socket, pool: Pool) {
    this.disconnectRoom.build(io, socket, pool);
    this.joinRoom.build(io, socket, pool);
    this.joinRoomsList.build(io, socket, pool);
    this.message.build(io, socket);
  }
}
