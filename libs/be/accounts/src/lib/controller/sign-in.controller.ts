import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('signInController')
export class SignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.httpReq.post(req, async (data: any) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    });
  }
}
