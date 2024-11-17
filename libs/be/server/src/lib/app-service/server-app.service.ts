import { injectable } from 'tsyringe';
import express from 'express';

import {
  MethodType,
  RouteType,
  serversConfig,
  ServerType,
} from '@distributed-chat-system/shared-server';

@injectable()
export class ServerAppService {
  runServer(type: ServerType) {
    const server = serversConfig.servers[type];
    const app = express();
    app.use((req, res) => {
      const reqUrl = req.url as RouteType;
      const reqMethod = req.method as MethodType;
      const route = server.routes[reqUrl];
      if (route) {
        const method = route[reqMethod];
        if (method) {
          res.send(method.controller);
          return;
        }
      }
      res.send('Not found!');
    });
    const { port } = server;
    app.listen(port, () => console.log(`The server runs on port ${port}`));
  }
}
