import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import {
  HttpController,
  RegisterController,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterController('helloController')
export class Root2Controller implements HttpController {
  build(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello');
  }
}
