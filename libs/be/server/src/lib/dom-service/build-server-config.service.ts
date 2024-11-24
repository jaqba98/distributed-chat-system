import { singleton } from 'tsyringe';

import {
  RouteConfigModel,
  ServerDomainModel,
} from '../model/domain/server-domain.model';

@singleton()
export class BuildServerConfigService {
  serverConfig: ServerDomainModel = {
    routes: {
      methods: {},
    },
    socketIo: {
      controller: '',
    },
  };

  build() {
    this.aaa();
    this.buildRoutes();
  }

  private aaa() {
    const { SERVER_SOCKET_IO } = process.env;
    if (SERVER_SOCKET_IO) {
      this.serverConfig.socketIo = {
        controller: SERVER_SOCKET_IO,
      };
    }
  }

  private buildRoutes() {
    Object.keys(process.env)
      .filter((key) => key.startsWith('SERVER_ROUTE_'))
      .map((key) => process.env[key])
      .filter((obj) => obj !== undefined)
      .map((obj) => JSON.parse(obj) as RouteConfigModel)
      .forEach((obj) => {
        const { method, url } = obj;
        if (!this.serverConfig.routes.methods[method]) {
          this.serverConfig.routes.methods[method] = {
            urls: {},
          };
        }
        this.serverConfig.routes.methods[method].urls[url] = obj;
      });
  }
}
