import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import mysql from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('rootController')
export class RootController implements HttpControllerModel {
  async build(_req: IncomingMessage, res: ServerResponse) {
    const pool = mysql.createPool({
      host: 'accounts_db',
      user: 'admin',
      password: 'admin',
      database: 'accounts',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('SELECT * FROM users');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(rows));
  }
}
