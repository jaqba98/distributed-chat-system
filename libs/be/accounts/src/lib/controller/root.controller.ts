import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('rootController')
export class RootController implements HttpControllerModel {
  async build(_req: IncomingMessage, res: ServerResponse, pool: Pool) {
    const [rows] = await pool.promise().query('SELECT * FROM users');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(rows));
  }
}
