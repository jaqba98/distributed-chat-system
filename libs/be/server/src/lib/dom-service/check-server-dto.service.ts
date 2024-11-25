import { injectable } from 'tsyringe';

import { ServerDtoModel } from '../model/dto/server-dto.model';
import { envVarNotSetMsg } from '../const/message.const';
import { SERVER_SOCKET_IO } from '../const/env.const';

@injectable()
export class CheckServerDtoService {
  check(dto: ServerDtoModel): void {
    this.checkSocketIO(dto.socketIO);
  }

  private checkSocketIO(socketIO: ServerDtoModel['socketIO']) {
    if (socketIO) return;
    throw new Error(envVarNotSetMsg(SERVER_SOCKET_IO));
  }
}
