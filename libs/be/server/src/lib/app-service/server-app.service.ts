import { inject, injectable } from 'tsyringe';

import { ServerType } from '@distributed-chat-system/shared-server';
import { ServerService } from '../dom-service/server.service';

@injectable()
export class ServerAppService {
  constructor(@inject(ServerService) private server: ServerService) {}

  runServer(type: ServerType) {
    this.server.register(type).create().listen();
  }
}
