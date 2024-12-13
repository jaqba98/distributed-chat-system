import { injectable } from 'tsyringe';

import { HttpDtoType, HttpRouteDtoModel } from '../model/dto/http-dto.model';
import {
  HTTP_ROUTE_,
  MYSQL_CORS,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
} from '../const/env.const';

@injectable()
export class BuildHttpDtoService {
  build(): HttpDtoType {
    return {
      routes: this.buildRoutes(),
      mysql: this.buildMysql(),
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

  private buildMysql(): HttpDtoType['mysql'] {
    return {
      host: process.env[MYSQL_HOST],
      database: process.env[MYSQL_DATABASE],
      port: process.env[MYSQL_PORT],
      cors: process.env[MYSQL_CORS],
    };
  }
}
