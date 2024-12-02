import { injectable } from 'tsyringe';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import {
  getHttpController,
  getSocketIoController,
} from '../service/controller-decorator.service';
import { serverIsRunningMsg } from '../const/message.const';

@injectable()
export class BuildServerService {
  async build(domain: ServerDomainModel) {
    const server = createServer((req, res) => {
      const method = req.method ?? '';
      const url = req.url ?? '';
      const { methods } = domain.routes;
      if (method in methods && url in methods[method].urls) {
        const { controller } = methods[method].urls[url];
        getHttpController(controller).build(req, res);
      } else {
        getHttpController('http404Controller').build(req, res);
      }
    });
    const pubClient = createClient({ url: 'redis://redis:6379' });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    const io = new Server({
      adapter: createAdapter(pubClient, subClient),
    });
    io.on('connection', (socket) => {
      getSocketIoController(domain.socketIO.controller).build(io, socket);
    });
    // io.listen(3000);
    server.listen(3000, () => {
      console.log(serverIsRunningMsg);
    });
  }
}
