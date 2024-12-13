import { IncomingMessage, request, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import { SignUpDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('signUpController')
export class SignUpController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: SignUpDtoModel) => {
      const inputText = JSON.stringify(input);
      const options = {
        hostname: 'accounts_load-balancer',
        port: 80,
        path: '/sign-up',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(inputText),
        },
      };
      const reqAccounts = request(options, (resAccounts) => {
        let data = '';
        resAccounts.on('data', (chunk) => (data += chunk));
        resAccounts.on('end', () => res.end(data));
      });
      reqAccounts.write(inputText);
      reqAccounts.end();
    });
  }
}
