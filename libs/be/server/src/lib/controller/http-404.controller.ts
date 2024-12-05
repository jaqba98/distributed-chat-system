import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import { RegisterHttp } from '../service/http-decorator.service';
import { HttpControllerModel } from '../model/controller/http-controller.model';

@injectable()
@RegisterHttp('http404Controller')
export class RootController implements HttpControllerModel {
  build(_req: IncomingMessage, res: ServerResponse) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('HTTP 404');
  }
}
