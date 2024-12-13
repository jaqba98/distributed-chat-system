import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('loginController')
export class LoginController implements HttpControllerModel {
  build(_req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ msg: 'login' }));
  }
}
