import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import {
  HttpControllerModel,
  RegisterHttp,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('helloController')
export class Root2Controller implements HttpControllerModel {
  build(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello');
  }
}
