import { inject, injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';

import {
  RegisterSocket,
  SocketControllerModel,
} from '@distributed-chat-system/be-server';
import { UserRoomsStore } from '../store/user-rooms.store';

@injectable()
@RegisterSocket('socketIOController')
export class SocketIOController implements SocketControllerModel {
  constructor(@inject(UserRoomsStore) private readonly store: UserRoomsStore) {}

  build(io: Server, socket: Socket) {
    console.log('works!');
    socket.on('joinRoom', (roomKey) => {
      const previousRoom = this.store.data.get(socket.id);
      if (previousRoom) {
        socket.leave(previousRoom);
      }
      this.store.data.set(socket.id, roomKey);
      socket.join(roomKey);
    });
    socket.on('message', ({ roomKey, message }) => {
      io.to(roomKey).emit('response', { sender: socket.id, message });
    });
    socket.on('disconnect', () => {
      const roomKey = this.store.data.get(socket.id);
      if (roomKey) {
        socket.leave(roomKey);
        this.store.data.delete(socket.id);
      }
    });
  }
}
