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
  async build(
    _req: IncomingMessage,
    res: ServerResponse,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pool: Pool
  ) {
    // const [rows] = await pool.promise().query('SELECT * FROM users');
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(rows));
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    res.end('login');
  }
}
