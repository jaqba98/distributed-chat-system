import { ServersConfigModel } from '../model/servers-config.model';

export const serversConfig: ServersConfigModel = {
  servers: {
    server1: {
      port: 3001,
      routes: {
        '/': {
          GET: {
            controller: 'server1Controller',
          },
        },
      },
    },
    server2: {
      port: 3002,
      routes: {
        '/': {
          GET: {
            controller: 'server2Controller',
          },
        },
      },
    },
  },
};
