import { injectable } from 'tsyringe';

import { ServerDtoPartialType } from '../model/dto/server-dto.model';
import {
  SERVER_ROUTE,
  SERVER_SOCKET_IO,
  SERVER_TYPE,
} from '../const/env.const';
import {
  ControllerModel,
  RouteModel,
} from '../model/dto/server-route-dto.model';

@injectable()
export class BuildServerDtoService {
  build(): ServerDtoPartialType {
    return {
      serverType: this.buildServerTypeDto(),
      serverRoutes: this.buildServerRoutes(),
      serverSocketIO: this.buildServerSocketIO(),
    };
  }

  private buildServerTypeDto() {
    try {
      return process.env[SERVER_TYPE];
    } catch {
      return undefined;
    }
  }

  private buildServerRoutes(): ServerDtoPartialType['serverRoutes'] {
    try {
      const routes = Object.keys(process.env)
        .filter((key) => key.startsWith(SERVER_ROUTE))
        .map((key) => {
          const val = process.env[key];
          if (val) return { key, val };
          return undefined;
        })
        .filter((env) => env !== undefined)
        .map((env) => {
          try {
            return {
              ...env,
              val: JSON.parse(env.val) as Partial<RouteModel>,
            };
          } catch {
            return {
              ...env,
              val: {
                method: undefined,
                url: undefined,
                controller: undefined,
              } as Partial<RouteModel>,
            };
          }
        })
        .map((env) => ({ id: env.key, ...env.val }));
      return routes.length > 0 ? routes : undefined;
    } catch {
      return undefined;
    }
  }

  private buildServerSocketIO() {
    try {
      const serverSocketIO = process.env[SERVER_SOCKET_IO];
      return serverSocketIO
        ? <ControllerModel>JSON.parse(serverSocketIO)
        : undefined;
    } catch {
      return undefined;
    }
  }
}
