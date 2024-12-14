import { Server, Socket } from 'socket.io';

export interface SocketControllerModel {
  build: (io: Server, socket: Socket) => void;
}
