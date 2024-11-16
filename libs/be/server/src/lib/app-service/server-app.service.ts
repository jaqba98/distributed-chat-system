import { injectable } from 'tsyringe';
import express from 'express';

import { ServerType } from '../type/server.type';
import { serversMetadata } from '../const/servers-metadata.const';

@injectable()
export class ServerAppService {
  runServer(type: ServerType) {
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
