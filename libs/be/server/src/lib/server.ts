import 'reflect-metadata';
import { container, inject, injectable } from 'tsyringe';

import { GetServerTypeService } from './infrastructure/get-server-type.service';
import { getServer } from './service/server-decorator.service';

import './app-service/http-app.service';
import './app-service/socket-app.service';
import './controller/cors.controller';
import './controller/page-not-found.controller';

@injectable()
class ServerAppService {
  constructor(
    @inject(GetServerTypeService) private getServerType: GetServerTypeService
  ) {}

  runServer() {
    const serverType = this.getServerType.get();
    getServer(serverType).build();
  }
}

export const runServer = () => {
  return container.resolve(ServerAppService).runServer();
};
