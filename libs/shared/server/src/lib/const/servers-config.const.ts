import { ServersConfigModel } from '../model/servers-config.model';

export const serversConfig: ServersConfigModel = {
  servers: {
    oneServer: {
      port: 3001,
      routes: {
        '/': {
          get: {
            controller: 'rootController',
          },
        },
      },
    },
    twoServer: {
      port: 3002,
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
