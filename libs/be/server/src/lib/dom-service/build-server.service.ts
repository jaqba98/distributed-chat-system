import { createServer, Server } from 'http';
import { inject, injectable } from 'tsyringe';

import { BuildServerConfigService } from './build-server-config.service';
import { getController } from '../service/controller-decorator.service';

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
    return this;
  }

  listen() {
    this.server.listen(3000, () => console.log('Server is running...'));
    return this;
  }
}
