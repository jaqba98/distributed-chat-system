import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import { RegisterModel } from '../model/register.model';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post<RegisterModel>(req, (data) => {
      // TODO: Create the registration logic
      pool.query(
        `INSERT INTO users (login, password) VALUES ("${data.email}", "${data.password}")`
      );
      res.writeHead(200, { 'Content-Type': 'plain/text' });
      const msg = `Email: ${data.email}, password: ${data.password}`;
      res.end(msg);
    });
  }
}
