import { injectable } from 'tsyringe';

import { envNotSetMsg } from '../const/message.const';
import { SocketDtoType } from '../model/dto/socket-dto.model';
import { SocketDomainModel } from '../model/domain/socket-domain.model';
import {
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_CORS,
} from '../const/env.const';

@injectable()
export class BuildSocketDomainService {
  build(dto: SocketDtoType): SocketDomainModel {
    const { controller } = dto;
    if (!controller) throw new Error(envNotSetMsg('controller'));
    return {
      controller,
      mysql: this.buildMysql(dto.mysql),
    };
  }

  private buildMysql(
    mysql: SocketDtoType['mysql']
  ): SocketDomainModel['mysql'] {
    if (!mysql) throw new Error(envNotSetMsg('mysql'));
    const { host, database, port, cors } = mysql;
    if (!host) throw new Error(envNotSetMsg(MYSQL_HOST));
    if (!database) throw new Error(envNotSetMsg(MYSQL_DATABASE));
    if (!port) throw new Error(envNotSetMsg(MYSQL_PORT));
    if (!cors) throw new Error(envNotSetMsg(MYSQL_CORS));
    return { host, database, port: +port, cors };
  }
}
