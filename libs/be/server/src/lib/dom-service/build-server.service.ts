import { createServer, Server } from 'http';
import { inject, injectable } from 'tsyringe';
import * as socket from 'socket.io';

import { BuildServerConfigService } from './build-server-config.service';
import { getController } from '../service/controller-decorator.service';

let connectedUsers = 0;

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
    @inject(BuildServerConfigService) private config: BuildServerConfigService
  ) {}

  init() {
    this.config.build();
    return this;
  }

  create() {
    this.server = createServer((req, res) => {
      const method = req.method ?? 'GET';
      const url = req.url ?? '/';
      const { controller } =
        this.config.serverConfig.routes.methods[method].urls[url];
      getController(controller).build(req, res);
    });

    // Attach Socket.IO to the server
    const io = new socket.Server(this.server, {
      cors: {
        origin: '*', // Allow all origins, adjust for production
      },
    });

    // Handle Socket.IO connections
    io.on('connection', (socket) => {
      connectedUsers++;
      console.log('A user connected:', socket.id);

      socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit(
          'response',
          `Hello, ${process.env.SERVER_PORT} you said: ${connectedUsers}`
        );
      });

      socket.on('disconnect', () => {
        connectedUsers--;
        console.log('User disconnected:', socket.id);
      });
    });

    return this;
  }

  listen() {
    this.server.listen(3000, () => console.log('Server is running...'));
    return this;
  }
}
