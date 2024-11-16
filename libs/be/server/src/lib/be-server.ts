import 'reflect-metadata';
import { container } from 'tsyringe';

import { ServerAppService } from './app-service/server-app.service';
import { ServerType } from './type/server.type';

const server = container.resolve(ServerAppService);

export const runServer = (type: ServerType) => server.runServer(type);
