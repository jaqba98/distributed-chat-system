import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import { RegisterHttp } from '../service/http-decorator.service';
import { HttpControllerModel } from '../model/controller/http-controller.model';

@injectable()
@RegisterHttp('http404Controller')
export class RootController implements HttpControllerModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(_req: IncomingMessage, res: ServerResponse, _pool: Pool) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('HTTP 404');
  }
}
