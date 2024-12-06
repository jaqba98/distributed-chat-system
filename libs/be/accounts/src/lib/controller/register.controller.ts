import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, (body) => {
      res.writeHead(200, { 'Content-Type': 'plain/text' });
      res.end(body);
    });
  }
}
