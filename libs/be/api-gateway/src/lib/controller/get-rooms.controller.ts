import { IncomingMessage, request, ServerResponse } from 'http';
import { injectable } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('getRoomsController')
export class GetRoomsController implements HttpControllerModel {
  build(req: IncomingMessage, res: ServerResponse) {
    const options = {
      hostname: 'rooms_load-balancer',
      port: 80,
      path: '/get-rooms',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reqAccounts = request(options, (resAccounts) => {
      let data = '';
      resAccounts.on('data', (chunk) => {
        data += chunk;
      });
      resAccounts.on('end', () => {
        res.writeHead(resAccounts.statusCode || 500, {
          'Content-Type': 'application/json',
        });
        res.end(data);
      });
    });
    reqAccounts.on('error', (error) => {
      console.error('Error fetching rooms:', error.message);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error fetching rooms' }));
    });
    reqAccounts.end();
  }
}
