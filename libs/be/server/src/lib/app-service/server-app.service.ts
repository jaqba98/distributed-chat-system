import { injectable } from 'tsyringe';
import express from 'express';

import { ServersType } from '../type/servers.type';
import { serversMetadata } from '../const/servers-metadata.const';

@injectable()
export class ServerAppService {
  runServer(type: ServersType) {
    // TODO: Create the server logic
    const server = serversMetadata.servers[type];
    const app = express();
    app.get('/', (_req, res) => {
      res.send('Hello World!');
    });
    app.listen(server.port, () => {
      console.log(`Example app listening on port ${server.port}`);
    });
  }
}
