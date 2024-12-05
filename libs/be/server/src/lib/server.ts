import 'reflect-metadata';
import { container } from 'tsyringe';

import { ServerAppService } from './app-service/server-app.service';

export const runServer = () => {
  return container.resolve(ServerAppService).runServer();
};
