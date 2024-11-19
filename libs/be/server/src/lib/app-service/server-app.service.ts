import { inject, injectable } from 'tsyringe';

import { BuildServerService } from '../dom-service/build-server.service';

@injectable()
export class ServerAppService {
  constructor(@inject(BuildServerService) private server: BuildServerService) {}

  runServer() {
    this.server.init().create().listen();
  }
}
