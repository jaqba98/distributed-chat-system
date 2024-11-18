import { serversConfig } from '../const/servers-config.const';
import { RouteEnum } from '../enum/route.enum';
import { MethodType } from '../type/method.type';
import { RouteType } from '../type/route.type';
import { ServerType } from '../type/server.type';

export class ServersConfigService {
  getPort(type: ServerType) {
    return serversConfig.servers[type].port;
  }

  getRoute(type: ServerType, url?: string, method?: string) {
    const newUrl = url ?? '';
    const newMethod = method ?? '';
    if (this.urlExistInRoute(newUrl)) {
      const server = serversConfig.servers[type];
      const routeType = this.getRouteType(newUrl);
      const methodType = this.getMethodType(newMethod);
      return server.routes[routeType][methodType];
    }
    return undefined;
  }

  private urlExistInRoute(url: string) {
    return Object.values(RouteEnum)
      .map((route) => route as string)
      .some((route) => route === url);
  }

  private getRouteType(url: string): RouteType {
    switch (url) {
      case '/':
        return '/';
      default:
        throw new Error(`Not supported url: ${url}!`);
    }
  }

  private getMethodType(method: string): MethodType {
    switch (method) {
      case 'GET':
        return 'get';
      default:
        throw new Error(`Not supported method: ${method}!`);
    }
  }
}
