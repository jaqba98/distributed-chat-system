// done
import { injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';

import { SocketControllerModel } from '@distributed-chat-system/be-server';

@injectable()
export class MessageService implements SocketControllerModel {
  build(io: Server, socket: Socket) {
    socket.on('message', ({ roomName, message }) => {
      io.to(roomName).emit('response', { sender: socket.id, message });
    });
  }
}
