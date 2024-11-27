import { injectable } from 'tsyringe';
import { createServer } from 'http';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import { serverIsRunningMsg } from '../const/message.const';
import { getHttpController } from '../service/controller-decorator.service';

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
    server.listen(3000, () => {
      console.log(serverIsRunningMsg);
    });
  }
}

// export class BuildServerService {
//   create() {
//     // const io = new socketIO.Server(this.server);
//     // io.on('connection', (socket) => {
//     //   const { socketIo } = this.config.serverConfig;
//     //   getSocketIoController(socketIo.controller).build(io, socket);
//     // });
//     return this;
//   }
// }
