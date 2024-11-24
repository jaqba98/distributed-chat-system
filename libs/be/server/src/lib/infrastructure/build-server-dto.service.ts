import { injectable } from 'tsyringe';

import { ServerDtoModel } from '../model/dto/server-dto.model';
import { RouteModel } from '../model/dto/route-dto.model';

@injectable()
export class BuildServerDtoService {
  build(): ServerDtoModel {
    return {
      routes: this.buildRoutes(),
      socketIO: this.buildSocketIO(),
    };
  }

  private buildRoutes(): ServerDtoModel['routes'] {
    return Object.keys(process.env)
      .filter((envKey) => envKey.startsWith('SERVER_ROUTE_'))
      .map((envKey) => {
        const envVal = process.env[envKey];
        if (envVal) return { envKey, envVal };
        return undefined;
      })
      .filter((env) => env !== undefined)
      .map((env) => {
        try {
          return {
            envKey: env.envKey,
            envVal: JSON.parse(env.envVal) as RouteModel,
          };
        } catch {
          return {
            envKey: env.envKey,
            envVal: {
              method: undefined,
              url: undefined,
              controller: undefined,
            } as RouteModel,
          };
        }
      })
      .map((env) => ({ id: env.envKey, ...env.envVal }));
  }

  private buildSocketIO() {
    return process.env.SERVER_SOCKET_IO;
  }
}
