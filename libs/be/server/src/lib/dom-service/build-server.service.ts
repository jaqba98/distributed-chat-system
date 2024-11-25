import { injectable } from 'tsyringe';
import { createServer } from 'http';

import { ServerDomainModel } from '../model/domain/server-domain.model';
import { serverIsRunningMsg } from '../const/message.const';

@injectable()
export class BuildServerService {
  build(domain: ServerDomainModel) {
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(domain, null, 2));
    });
    server.listen(3000, () => {
      console.log(serverIsRunningMsg);
    });
  }
}

// export class BuildServerService {
//   create() {
//     this.server = createServer((req, res) => {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(this.config.build(), null, 2));
//       // const { method, url } = req;
//       // if (!method) throw new Error('Not specified request method!');
//       // if (!url) throw new Error('Not specified request url!');
//       // const { urls } = this.config.serverConfig.routes.methods[method];
//       // const { controller } = urls[url];
//       // getHttpController(controller).build(req, res);
//     });
//     // const io = new socketIO.Server(this.server);
//     // io.on('connection', (socket) => {
//     //   const { socketIo } = this.config.serverConfig;
//     //   getSocketIoController(socketIo.controller).build(io, socket);
//     // });
//     return this;
//   }
// }
