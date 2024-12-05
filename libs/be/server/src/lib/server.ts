import 'reflect-metadata';
import { container, inject, injectable } from 'tsyringe';

import { GetServerTypeService } from './infrastructure/get-server-type.service';
import { getServer } from './service/server-decorator.service';

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
