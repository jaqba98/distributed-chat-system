import { injectable } from 'tsyringe';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import {
  notSupportedServerType,
  serverIsRunningMsg,
} from '../const/message.const';
import {
  getHttpController,
  getSocketIoController,
} from '../service/controller-decorator.service';

@injectable()
export class BuildServerService {
  build(domain: ServerDomainModel) {
    const { serverType } = domain;
    switch (serverType) {
      case 'http':
        this.buildHttp(domain.serverRoutes);
        break;
      case 'socketIO':
        this.buildSocketIO(domain.serverSocketIO);
        break;
      default:
        throw new Error(notSupportedServerType(serverType));
    }
  }

  private buildHttp(serverRoutes: ServerDomainModel['serverRoutes']) {
    const server = createServer((req, res) => {
      const method = req.method ?? '';
      const url = req.url ?? '';
      const { methods } = serverRoutes;
      if (method in methods && url in methods[method].urls) {
        const { controller } = methods[method].urls[url];
        getHttpController(controller).build(req, res);
      } else {
        getHttpController('http404Controller').build(req, res);
      }
    });
    server.listen(3000, () => {
      console.log(serverIsRunningMsg);
    });
  }

  private async buildSocketIO(
    serverSocketIO: ServerDomainModel['serverSocketIO']
  ) {
    const pubClient = createClient({ url: 'redis://redis:6379' });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    const io = new Server({
      adapter: createAdapter(pubClient, subClient),
    });
    io.on('connection', (socket) => {
      getSocketIoController(serverSocketIO.controller).build(io, socket);
    });
    io.listen(3000);
  }
}
