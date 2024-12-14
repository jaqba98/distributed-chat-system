import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import { SignInDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('signInController')
export class SignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (data: SignInDtoModel) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    });
  }
}
