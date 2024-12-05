import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import {
  RegisterHttp,
  HttpControllerModel,
} from '@distributed-chat-system/be-server';

@injectable()
@RegisterHttp('rootController')
export class RootController implements HttpControllerModel {
  build(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(req.url);
  }
}
