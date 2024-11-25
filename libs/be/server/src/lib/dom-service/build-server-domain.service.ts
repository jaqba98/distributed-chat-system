import { injectable } from 'tsyringe';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import { ServerDtoModel } from '../model/dto/server-dto.model';
import {
  ControllerDomainModel,
  RoutesDomainModel,
} from '../model/domain/routes-domain.model';
import { RouteDtoModel } from '../model/dto/route-dto.model';
import { buildServerDomainErrorMsg } from '../const/message.const';

@injectable()
export class BuildServerDomainService {
  build(dto: ServerDtoModel): ServerDomainModel {
    return {
      routes: this.buildRoutes(dto.routes),
      socketIO: this.buildSocketIO(dto.socketIO),
    };
  }

  private buildRoutes(routes: RouteDtoModel[]) {
    const domainRoutes: RoutesDomainModel = {
      methods: {},
    };
    for (const route of routes) {
      const { method, url, controller } = route;
      if (!method || !url || !controller) {
        throw new Error(buildServerDomainErrorMsg);
      }
      if (!domainRoutes.methods[method]) {
        domainRoutes.methods[method as string].urls = {};
      }
      domainRoutes.methods[method as string].urls[url as string] = {
        controller: controller,
      };
    }
    return domainRoutes;
  }

  private buildSocketIO(socketIO?: string): ControllerDomainModel {
    if (socketIO) {
      return {
        controller: socketIO,
      };
    }
    throw new Error(buildServerDomainErrorMsg);
  }
}