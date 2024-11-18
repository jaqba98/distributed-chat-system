import { ServersConfigModel } from '../model/servers-config.model';

export const serversConfig: ServersConfigModel = {
  servers: {
    chatServer: {
      port: 3000,
      routes: {
        '/': {
          get: {
            controller: 'rootController',
          },
        },
      },
    },
  },
};
