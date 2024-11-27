import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import { RegisterController } from '../service/controller-decorator.service';
import { HttpController } from './http.controller';

@injectable()
@RegisterController('http404Controller')
export class RootController implements HttpController {
  build(_req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('HTTP 404');
  }
}
