import { ServersConfigModel } from '../model/servers-config.model';

export const serversConfig: ServersConfigModel = {
  servers: {
    aServer: {
      port: 3000,
      routes: {
        '/a': {
          GET: {
            controller: 'aController',
          },
        },
      },
    },
  },
};
