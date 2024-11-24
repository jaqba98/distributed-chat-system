import { injectable } from 'tsyringe';

import { ServerDtoModel } from '../model/dto/server-dto.model';
import { RouteDtoModel } from '../model/dto/route-dto.model';

@injectable()
export class BuildServerDtoService {
  build(): ServerDtoModel {
    return {
      routes: this.buildRoutes(),
      socketIO: process.env.SERVER_SOCKET_IO,
    };
  }

  private buildRoutes(): ServerDtoModel['routes'] {
    return Object.keys(process.env)
      .filter((envKey) => envKey.startsWith('SERVER_ROUTE_'))
      .map((envKey) => process.env[envKey])
      .filter((env) => env !== undefined)
      .map((env) => JSON.parse(env) as RouteDtoModel);
  }
}
