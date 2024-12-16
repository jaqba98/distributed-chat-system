import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';
import { verify } from 'jsonwebtoken';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  JWT_SECRET_KEY,
} from '@distributed-chat-system/be-server';
import {
  ResponseDtoModel,
  TokenDtoModel,
} from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('protectedController')
export class ProtectedController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (data: TokenDtoModel) => {
      const { token } = data;
      if (token) {
        try {
          verify(token, JWT_SECRET_KEY);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify(<ResponseDtoModel>{ data: 'success', success: true })
          );
          return;
        } catch (error) {
          console.log(error);
        }
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify(<ResponseDtoModel>{ data: 'error', success: false })
      );
    });
  }
}
