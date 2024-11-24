import { injectable } from 'tsyringe';
import { Server, Socket } from 'socket.io';

import { methodNotImplementedMsg } from '../const/message.const';

@injectable()
export class SocketIoController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(_io: Server, _socket: Socket) {
    throw new Error(methodNotImplementedMsg);
  }
}
