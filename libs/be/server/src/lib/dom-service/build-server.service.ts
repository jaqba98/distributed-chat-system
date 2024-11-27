import { injectable } from 'tsyringe';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import { serverIsRunningMsg } from '../const/message.const';
import {
  getHttpController,
  getSocketIoController,
} from '../service/controller-decorator.service';

@injectable()
export class BuildServerService {
  build(domain: ServerDomainModel) {
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
    const io = new Server(server);
    io.on('connection', (socket) => {
      getSocketIoController(domain.socketIO.controller).build(io, socket);
    });
    server.listen(3000, () => {
      console.log(serverIsRunningMsg);
    });
  }
}
