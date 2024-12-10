import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('loginController')
export class LoginController implements HttpControllerModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async build(_req: IncomingMessage, res: ServerResponse, pool: Pool) {
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    res.end('login');
  }
}
