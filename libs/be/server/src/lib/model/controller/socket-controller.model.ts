import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import { Server, Socket } from 'socket.io';

export interface SocketControllerModel {
  build: (io: Server, socket: Socket, pool: Pool) => void;
}
