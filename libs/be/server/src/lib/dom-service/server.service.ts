import { createServer, Server } from 'http';
import { inject, injectable } from 'tsyringe';

import {
  ServersConfigAppService,
  ServerType,
} from '@distributed-chat-system/shared-server';

@injectable()
export class ServerService {
  private _type?: ServerType;

  private _server?: Server;

  private get type() {
    if (this._type) return this._type;
    throw new Error('Server not registered!');
  }

  private set type(type: ServerType) {
    this._type = type;
  }

  private get server() {
    if (this._server) return this._server;
    throw new Error('Server not created!');
  }

  private set server(server: Server) {
    this._server = server;
  }

  constructor(
    @inject(ServersConfigAppService) private servers: ServersConfigAppService
  ) {}

  register(type: ServerType) {
    this.type = type;
    return this;
  }

  create() {
    this.server = createServer((req, res) => {
      const route = this.servers.getRoute(this.type, req.url, req.method);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      if (route) {
        res.end(route.controller);
      } else {
        res.end('404');
      }
    });
    return this;
  }

  listen() {
    const port = this.servers.getPort(this.type);
    this.server.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
    return this;
  }
}
