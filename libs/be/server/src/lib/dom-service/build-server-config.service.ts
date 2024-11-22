import { singleton } from 'tsyringe';

import {
  RouteConfigModel,
  ServerConfigModel,
} from '../model/server-config.model';

@singleton()
export class BuildServerConfigService {
  serverConfig: ServerConfigModel = {
    routes: {},
  };

  build() {
    this.buildRoutes();
  }

  private buildRoutes() {
    Object.keys(process.env)
      .filter((key) => key.startsWith('SERVER_ROUTE_'))
      .map((key) => process.env[key])
      .filter((obj) => obj !== undefined)
      .map((obj) => JSON.parse(obj) as RouteConfigModel)
      .forEach((obj) => {
        this.serverConfig.routes[obj.url] = obj;
      });
  }
}
