import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async build(_req: IncomingMessage, res: ServerResponse, pool: Pool) {
    // const [rows] = await pool.promise().query('SELECT * FROM users');
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(rows));
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    res.end('register');
  }
}
