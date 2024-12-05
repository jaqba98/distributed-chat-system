import { injectable } from 'tsyringe';

import { ServerDtoPartialType } from '../model/dto/http-dto.model';
import {
  envVarNotSetMsg,
  routeNotPropertySetMsg,
  routesNotSetMsg,
} from '../const/message.const';
import {
  SERVER_SOCKET_IO,
  SERVER_SOCKET_IO_CONTROLLER,
  SERVER_TYPE,
} from '../const/env.const';

@injectable()
export class CheckServerDtoService {
  check(dto: ServerDtoPartialType) {
    this.checkServerTypeDto(dto.serverType);
    this.checkServerRoutes(dto.serverRoutes);
    this.checkServerSocketIO(dto.serverSocketIO);
  }

  private checkServerTypeDto(serverType: ServerDtoPartialType['serverType']) {
    if (!serverType) throw new Error(envVarNotSetMsg(SERVER_TYPE));
  }

  private checkServerRoutes(
    serverRoutes: ServerDtoPartialType['serverRoutes']
  ) {
    if (!serverRoutes) return;
    const errors: string[] = [];
    for (const serverRoute of serverRoutes) {
      if (!serverRoute.method) {
        errors.push(routeNotPropertySetMsg(serverRoute.id, 'method'));
      }
      if (!serverRoute.url) {
        errors.push(routeNotPropertySetMsg(serverRoute.id, 'url'));
      }
      if (!serverRoute.controller) {
        errors.push(routeNotPropertySetMsg(serverRoute.id, 'controller'));
      }
    }
    if (errors.length === 0) return;
    throw new Error(routesNotSetMsg(errors));
  }

  private checkServerSocketIO(
    serverSocketIO: ServerDtoPartialType['serverSocketIO']
  ) {
    if (!serverSocketIO) {
      throw new Error(envVarNotSetMsg(SERVER_SOCKET_IO));
    }
    if (!serverSocketIO.controller) {
      throw new Error(envVarNotSetMsg(SERVER_SOCKET_IO_CONTROLLER));
    }
  }
}
