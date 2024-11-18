import { inject, injectable } from 'tsyringe';

import { ServerService } from '../dom-service/server.service';

@injectable()
export class ServerAppService {
  constructor(@inject(ServerService) private server: ServerService) {}

  runServer() {
    this.server.init().create().listen();
  }
}
