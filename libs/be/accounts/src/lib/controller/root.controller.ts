import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import {
  HttpController,
  RegisterController,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterController('rootController')
export class RootController extends HttpController {
  override build(_req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Context-Type': 'text/plain' });
    res.end('accounts works!');
  }
}
