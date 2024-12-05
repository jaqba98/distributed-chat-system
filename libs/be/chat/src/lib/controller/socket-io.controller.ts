import { injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';

import {
  RegisterHttp,
  SocketIoController,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('socketIOController')
export class SocketIOController implements SocketIoController {
  build(io: Server, socket: Socket): void {
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
