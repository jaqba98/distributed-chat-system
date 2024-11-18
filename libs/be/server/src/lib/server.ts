import 'reflect-metadata';
import { container } from 'tsyringe';

import { ServerType } from '@distributed-chat-system/shared-server';
import { ServerAppService } from './app-service/server-app.service';

const server = container.resolve(ServerAppService);

export const runServer = (type: ServerType) => server.runServer(type);
