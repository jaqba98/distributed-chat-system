import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import { RegisterHttp } from '../service/http-decorator.service';
import { HttpControllerModel } from '../model/controller/http-controller.model';

@injectable()
@RegisterHttp('corsController')
export class CorsController implements HttpControllerModel {
  build(_req: IncomingMessage, res: ServerResponse) {
    res.writeHead(204);
    res.end();
  }
}
