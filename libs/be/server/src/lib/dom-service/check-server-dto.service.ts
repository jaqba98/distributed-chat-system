import { injectable } from 'tsyringe';

import { ServerDtoModel } from '../model/dto/server-dto.model';
import {
  envVarNotSetMsg,
  routeNotPropertySetMsg,
  routesNotSetMsg,
} from '../const/message.const';
import { SERVER_SOCKET_IO } from '../const/env.const';

@injectable()
export class CheckServerDtoService {
  check(dto: ServerDtoModel) {
    this.checkRoutes(dto.routes);
    this.checkSocketIO(dto.socketIO);
  }

  private checkRoutes(routes: ServerDtoModel['routes']) {
    const errors: string[] = [];
    for (const route of routes) {
      if (!route.method) {
        errors.push(routeNotPropertySetMsg(route.id, 'method'));
      }
      if (!route.url) {
        errors.push(routeNotPropertySetMsg(route.id, 'url'));
      }
      if (!route.controller) {
        errors.push(routeNotPropertySetMsg(route.id, 'controller'));
      }
    }
    if (errors.length === 0) return;
    throw new Error(routesNotSetMsg(errors));
  }

  private checkSocketIO(socketIO: ServerDtoModel['socketIO']) {
    if (socketIO) return;
    throw new Error(envVarNotSetMsg(SERVER_SOCKET_IO));
  }
}
