import { injectable } from 'tsyringe';

import { SocketDtoType } from '../model/dto/socket-dto.model';
import { SERVER_SOCKET_IO_CONTROLLER } from '../const/env.const';

@injectable()
export class BuildSocketDtoService {
  build(): SocketDtoType {
    return {
      controller: process.env[SERVER_SOCKET_IO_CONTROLLER],
    };
  }
}
