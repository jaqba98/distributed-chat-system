import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('rootController')
export class RootController implements HttpControllerModel {
  build(_req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Context-Type': 'text/plain' });
    res.end('accounts works!');
  }
}
