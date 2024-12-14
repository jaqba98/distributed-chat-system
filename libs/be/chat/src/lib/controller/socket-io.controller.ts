import { injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';

import {
  RegisterSocket,
  SocketControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterSocket('socketIOController')
export class SocketIOController implements SocketControllerModel {
  build(io: Server, socket: Socket) {
    console.log('A user connected: ', socket.id);
    socket.on('message', (data) => {
      console.log('Message received:', data);
      io.emit('response', data);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  }
}
