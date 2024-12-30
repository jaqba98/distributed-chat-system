// done
import { injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';

import { SocketControllerModel } from '@distributed-chat-system/be-server';
import { MessageDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
export class MessageService implements SocketControllerModel {
  build(io: Server, socket: Socket) {
    socket.on('message', (dto: MessageDtoModel) => {
      io.to(dto.roomName).emit('response', dto);
    });
  }
}
