import { createServer, Server } from 'http';
import { inject, injectable } from 'tsyringe';
import { BuildServerDtoService } from '../infrastructure/build-server-dto.service';
// import * as socketIO from 'socket.io';

// import {
//   getHttpController,
//   getSocketIoController,
// } from '../service/controller-decorator.service';

@injectable()
export class BuildServerService {
  private _server?: Server;

  private get server() {
    if (this._server) return this._server;
    throw new Error('Server not exist!');
  }

  private set server(server: Server) {
    this._server = server;
  }

  constructor(
    @inject(BuildServerDtoService) private config: BuildServerDtoService
  ) {}

  init() {
    return this;
  }

  create() {
    this.server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(this.config.build(), null, 2));
      // const { method, url } = req;
      // if (!method) throw new Error('Not specified request method!');
      // if (!url) throw new Error('Not specified request url!');
      // const { urls } = this.config.serverConfig.routes.methods[method];
      // const { controller } = urls[url];
      // getHttpController(controller).build(req, res);
    });
    // const io = new socketIO.Server(this.server);
    // io.on('connection', (socket) => {
    //   const { socketIo } = this.config.serverConfig;
    //   getSocketIoController(socketIo.controller).build(io, socket);
    // });
    return this;
  }

  listen() {
    this.server.listen(3000, () => console.log('Server is running...'));
    return this;
  }
}
