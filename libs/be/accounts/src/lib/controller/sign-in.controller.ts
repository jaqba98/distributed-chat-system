import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  JWT_SECRET_KEY,
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
      const select = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`;
      const [result] = await pool.promise().query(select);
      const users = result as UsersDtoModel;
      if (users.length === 0) {
        const dto: ResponseDtoModel = {
          data: 'Incorrect email or password!',
          success: false,
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dto));
        return;
      }
      const token = jwt.sign({ email, jti: uuidv4() }, JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      const dto: ResponseDtoModel = { data: token, success: true };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(dto));
    });
  }
}
