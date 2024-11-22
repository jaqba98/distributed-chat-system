import { IncomingMessage, ServerResponse } from 'http';

import {
  BaseController,
  RegisterController,
} from '@distributed-chat-system/be-server';

@RegisterController('rootController')
export class RootController extends BaseController {
  build(_req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
  }
}
