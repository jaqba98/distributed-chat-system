import 'reflect-metadata';
import { container } from 'tsyringe';

import { ServerAppService } from './app-service/server-app.service';

const server = container.resolve(ServerAppService);

export const runServer = () => server.runServer();
