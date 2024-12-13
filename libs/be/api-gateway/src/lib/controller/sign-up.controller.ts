import { IncomingMessage, request, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('signUpController')
export class SignUpController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    // TODO: Refactor the code
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.httpReq.post(req, async (data2: any) => {
      console.log(1);
      const data = JSON.stringify(data2);

      const options = {
        hostname: 'accounts_load-balancer',
        port: 80,
        path: '/sign-up',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      };

      const req2 = request(options, (res2) => {
        let data = '';

        res2.on('data', (chunk) => {
          data += chunk;
        });

        res2.on('end', () => {
          console.log('Response from B:', data);
          res.end(data);
        });
      });

      req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
      });

      req2.write(data);
      req2.end();
    });
  }
}
