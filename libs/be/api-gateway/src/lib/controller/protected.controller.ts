import { IncomingMessage, request, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import { TokenDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('protectedController')
export class ProtectedController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (token: TokenDtoModel) => {
      const tokenText = JSON.stringify(token);
      const options = {
        hostname: 'accounts_load-balancer',
        port: 80,
        path: '/protected',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(tokenText),
        },
      };
      const reqAccounts = request(options, (resAccounts) => {
        let data = '';
        resAccounts.on('data', (chunk) => (data += chunk));
        resAccounts.on('end', () => res.end(data));
      });
      reqAccounts.write(tokenText);
      reqAccounts.end();
    });
  }
}
