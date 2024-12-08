import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import { RegisterModel } from '../model/register.model';
import { log } from 'console';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.httpReq.post<RegisterModel>(req, (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pool.query('SELECT * FROM users', (err, result, fields) => {
        res.writeHead(200, { 'Content-Type': 'plain/text' });
        res.end(result);
      });
    });
  }
}
