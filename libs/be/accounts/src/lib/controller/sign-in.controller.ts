import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import {
  ResponseDtoModel,
  SignInDtoModel,
  UsersDtoModel,
} from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('signInController')
export class SignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (data: SignInDtoModel) => {
      const { email, password } = data;
      const selectUser = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`;
      const [resultUser] = await pool.promise().query(selectUser);
      if ((<UsersDtoModel>resultUser).length > 0) {
        this.sendRes(res, 'You have logged in successfully', true);
        return;
      }
      this.sendRes(res, 'Incorrect email address or password!');
    });
  }

  private sendRes(res: ServerResponse, msg: string, success = false) {
    const data: ResponseDtoModel = { msg, success };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
}
