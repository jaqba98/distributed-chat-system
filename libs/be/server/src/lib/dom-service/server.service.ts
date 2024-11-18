import { createServer, Server } from 'http';
import { inject, injectable } from 'tsyringe';

import { ServerEnvService } from './server-env.service';

@injectable()
export class ServerService {
  private _server?: Server;

  private get server() {
    if (this._server) return this._server;
    throw new Error('Server not created!');
  }

  private set server(server: Server) {
    this._server = server;
  }

  constructor(@inject(ServerEnvService) private serverEnv: ServerEnvService) {}

  init() {
    this.serverEnv.init();
    return this;
  }

  create() {
    // Refactor the server
    this.server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(this.serverEnv.data, null, 2));
    });
    return this;
  }

  listen() {
    // Use port from env
    this.server.listen(3000, () => {
      console.log(`Listening on ${3000}`);
    });
    return this;
  }
}
