import { injectable } from 'tsyringe';

import { SocketDtoType } from '../model/dto/socket-dto.model';
import {
  MYSQL_CORS,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  SERVER_SOCKET_IO_CONTROLLER,
} from '../const/env.const';

@injectable()
export class BuildSocketDtoService {
  build(): SocketDtoType {
    return {
      controller: process.env[SERVER_SOCKET_IO_CONTROLLER],
      mysql: this.buildMysql(),
    };
  }

  private buildMysql(): SocketDtoType['mysql'] {
    return {
      host: process.env[MYSQL_HOST],
      database: process.env[MYSQL_DATABASE],
      port: process.env[MYSQL_PORT],
      cors: process.env[MYSQL_CORS],
    };
  }
}
