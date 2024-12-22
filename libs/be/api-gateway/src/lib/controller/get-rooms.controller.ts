import { IncomingMessage, request, ServerResponse } from 'http';
import { injectable } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('getRoomsController')
export class GetRoomsController implements HttpControllerModel {
  build(_req: IncomingMessage, res: ServerResponse) {
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
      resAccounts.on('data', (chunk) => (data += chunk));
      resAccounts.on('end', () => res.end(data));
    });
    reqAccounts.end();
  }
}
