import 'reflect-metadata';
import { container } from 'tsyringe';

import { ServerAppService } from './app-service/server-app.service';
import { ServersType } from './type/servers.type';

const server = container.resolve(ServerAppService);

export const runServer = (type: ServersType) => server.runServer(type);
