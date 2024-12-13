import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import { RegisterHttp } from '../service/http-decorator.service';
import { HttpControllerModel } from '../model/controller/http-controller.model';

@injectable()
@RegisterHttp('pageNotFoundController')
export class PageNotFoundController implements HttpControllerModel {
  build(_req: IncomingMessage, res: ServerResponse) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Page not found!' }));
  }
}
