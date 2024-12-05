import { injectable } from 'tsyringe';

import { HttpDtoType, HttpRouteDtoModel } from '../model/dto/http-dto.model';
import { HTTP_ROUTE_ } from '../const/env.const';

@injectable()
export class BuildHttpDtoService {
  build(): HttpDtoType {
    return {
      routes: this.buildRoutes(),
    };
  }

  private buildRoutes(): HttpDtoType['routes'] {
    return Object.keys(process.env)
      .filter((key) => key.startsWith(HTTP_ROUTE_))
      .map((key) => {
        const val = process.env[key];
        if (val) return { key, val };
        return undefined;
      })
      .filter((env) => env !== undefined)
      .map((env) => {
        try {
          return <HttpRouteDtoModel>{ id: env.key, ...JSON.parse(env.val) };
        } catch {
          return <HttpRouteDtoModel>{ id: env.key };
        }
      });
  }
}
