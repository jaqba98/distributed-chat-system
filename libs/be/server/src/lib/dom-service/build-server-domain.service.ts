import { injectable } from 'tsyringe';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import { ServerDtoPartialType } from '../model/dto/server-dto.model';
import {
  ControllerDomainModel,
  RoutesDomainModel,
} from '../model/domain/routes-domain.model';
import { buildServerDomainErrorMsg } from '../const/message.const';

@injectable()
export class BuildServerDomainService {
  build(dto: ServerDtoPartialType): ServerDomainModel {
    return {
      serverType: this.buildServerTypeDomain(dto.serverType),
      serverRoutes: this.buildServerRoutes(dto.serverRoutes),
      serverSocketIO: this.buildSocketIO(dto.serverSocketIO),
    };
  }

  private buildServerTypeDomain(
    serverType: ServerDtoPartialType['serverType']
  ) {
    if (!serverType) throw new Error(buildServerDomainErrorMsg);
    return serverType;
  }

  private buildServerRoutes(
    serverRoutes: ServerDtoPartialType['serverRoutes']
  ) {
    const domainRoutes: RoutesDomainModel = { methods: {} };
    if (!serverRoutes) return domainRoutes;
    for (const serverRoute of serverRoutes) {
      const { method, url, controller } = serverRoute;
      if (!method || !url || !controller) {
        throw new Error(buildServerDomainErrorMsg);
      }
      if (!domainRoutes.methods[method]) {
        domainRoutes.methods[method] = {
          urls: {},
        };
      }
      domainRoutes.methods[method].urls[url] = { controller };
    }
    return domainRoutes;
  }

  private buildSocketIO(
    serverSocketIO: ServerDtoPartialType['serverSocketIO']
  ): ControllerDomainModel {
    if (!serverSocketIO || !serverSocketIO.controller)
      throw new Error(buildServerDomainErrorMsg);
    return { controller: serverSocketIO.controller };
  }
}
