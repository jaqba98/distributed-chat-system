import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import { injectable } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('getRoomsController')
export class GetRoomsController implements HttpControllerModel {
  async build(_req: IncomingMessage, res: ServerResponse, pool: Pool) {
    const selectRooms = 'SELECT * FROM rooms';
    const [resultRooms] = await pool.promise().query(selectRooms);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(resultRooms));
  }
}
