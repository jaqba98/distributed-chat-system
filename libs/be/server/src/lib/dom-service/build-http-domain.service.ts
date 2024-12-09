import { injectable } from 'tsyringe';

import { HttpDomainModel } from '../model/domain/http-domain.model';
import { HttpDtoType } from '../model/dto/http-dto.model';
import {
  envNotSetMsg,
  httpRouteNotPropertySetMsg,
} from '../const/message.const';
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT } from '../const/env.const';

@injectable()
export class BuildHttpDomainService {
  build(dto: HttpDtoType): HttpDomainModel {
    return {
      routes: this.buildRoutes(dto.routes),
      mysql: this.buildMysql(dto.mysql),
    };
  }

  private buildRoutes(
    routes: HttpDtoType['routes']
  ): HttpDomainModel['routes'] {
    const domainRoutes: HttpDomainModel['routes'] = { methods: {} };
    if (!routes) return domainRoutes;
    for (const route of routes) {
      const { id, method, url, controller } = route;
      if (!method) {
        throw new Error(httpRouteNotPropertySetMsg(id, 'method'));
      }
      if (!url) {
        throw new Error(httpRouteNotPropertySetMsg(id, 'url'));
      }
      if (!controller) {
        throw new Error(httpRouteNotPropertySetMsg(id, 'controller'));
      }
      if (!domainRoutes.methods[method]) {
        domainRoutes.methods[method] = { urls: {} };
      }
      domainRoutes.methods[method].urls[url] = { controller };
    }
    return domainRoutes;
  }

  private buildMysql(mysql: HttpDtoType['mysql']): HttpDomainModel['mysql'] {
    if (!mysql) throw new Error(envNotSetMsg('mysql'));
    const { host, database, port } = mysql;
    if (!host) throw new Error(envNotSetMsg(MYSQL_HOST));
    if (!database) throw new Error(envNotSetMsg(MYSQL_DATABASE));
    if (!port) throw new Error(envNotSetMsg(MYSQL_PORT));
    return { host, database, port: +port };
  }
}
