import { inject, injectable } from 'tsyringe';
import { createServer, Server } from 'http';

import { BuildEnvService } from './build-env.service';

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

  constructor(@inject(BuildEnvService) private buildEnv: BuildEnvService) {}

  init() {
    this.buildEnv.build();
    return this;
  }

  create() {
    this.server = createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(process.env, null, 2));
    });
    return this;
  }

  listen() {
    this.server.listen(3000, () => {
      console.log(`Listening on 3000`);
    });
    return this;
  }
}
