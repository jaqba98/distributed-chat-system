import { injectable } from 'tsyringe';
import { createServer } from 'http';

import { HttpDomainModel } from '../model/domain/http-domain.model';
import { serverIsRunningMsg } from '../const/message.const';
import { getHttp } from '../service/http-decorator.service';

@injectable()
export class BuildHttpServerService {
  build(domain: HttpDomainModel) {
    const server = createServer((req, res) => {
      const method = req.method ?? '';
      const url = req.url ?? '';
      const { methods } = domain.routes;
      if (method in methods && url in methods[method].urls) {
        const { controller } = methods[method].urls[url];
        getHttp(controller).build(req, res);
      } else {
        getHttp('http404Controller').build(req, res);
      }
    });
    server.listen(3000, () => console.log(serverIsRunningMsg));
  }
}
