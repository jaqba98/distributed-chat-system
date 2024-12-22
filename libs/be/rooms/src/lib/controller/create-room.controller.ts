import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import {
  CreateRoomDtoModel,
  ResponseDtoModel,
  RoomsDtoModel,
} from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('createRoomController')
export class CreateRoomController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (data: CreateRoomDtoModel) => {
      const { name, password } = data;
      if (name.length === 0) {
        this.sendRes(res, 'Name cannot be empty.');
        return;
      }
      if (password.length < 6) {
        this.sendRes(res, 'Password must be at least 6 characters long.');
        return;
      }
      const selectName = `SELECT name FROM rooms WHERE name="${name}"`;
      const [resultName] = await pool.promise().query(selectName);
      if ((<RoomsDtoModel>resultName).length > 0) {
        this.sendRes(res, 'Name is already in use!');
        return;
      }
      const insert = `INSERT INTO rooms (name, password) VALUES ("${name}", ${password})`;
      pool.query(insert);
      this.sendRes(res, 'Room created!', true);
    });
  }

  private sendRes(res: ServerResponse, msg: string, success = false) {
    const data: ResponseDtoModel = { data: msg, success };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
}
