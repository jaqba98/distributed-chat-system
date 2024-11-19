import { inject, injectable } from 'tsyringe';
import { createServer, Server } from 'http';

import { BuildEnvService } from './build-env.service';

@injectable()
export class BuildServerService {
  private _server?: Server;

  private get server() {
    if (this._server) return this._server;
    throw new Error('c');
  }

  private set server(server: Server) {
    this._server = server;
  }

  constructor(@inject(BuildEnvService) private env: BuildEnvService) {}

  init() {
    this.env.build();
    return this;
  }

  create() {
    this.server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(this.env.env.port.toString());
    });
    return this;
  }

  listen() {
    this.server.listen(this.env.env.port, () => {
      console.log(`Listening on ${this.env.env.port}`);
    });
    return this;
  }
}
