import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import {
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('logoutController')
export class LogoutController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (data: TokenDtoModel) => {
      const { token } = data;
      console.log(token);
      const insert = `INSERT INTO blockedTokens (token) VALUES ("${token}")`;
      await pool.promise().query(insert);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify(<ResponseDtoModel<string>>{
          data: 'success',
          success: true,
        })
      );
    });
  }
}
