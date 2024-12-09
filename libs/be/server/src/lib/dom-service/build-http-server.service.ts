import { injectable } from 'tsyringe';
import { createServer } from 'http';
import mysql from 'mysql2';

import { HttpDomainModel } from '../model/domain/http-domain.model';
import { serverIsRunningMsg } from '../const/message.const';
import { getHttp } from '../service/http-decorator.service';

@injectable()
export class BuildHttpServerService {
  build(domain: HttpDomainModel) {
    const connection = mysql.createConnection({
      host: 'accounts_db',
      user: 'admin',
      password: 'admin',
      database: 'accounts',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      port: 5001,
      localAddress: undefined,
    });
    console.log(connection);
    connection.connect((err) => {
      if (err) {
        console.error('Connection error:', err);
      } else {
        console.log('Connected!');
      }
    });
    const server = createServer((req, res) => {
      const method = req.method ?? '';
      const url = req.url ?? '';
      const { methods } = domain.routes;
      if (method in methods && url in methods[method].urls) {
        const { controller } = methods[method].urls[url];
        getHttp(controller).build(req, res, connection);
      } else {
        getHttp('http404Controller').build(req, res, connection);
      }
    });
    server.listen(3000, () => console.log(serverIsRunningMsg));
  }
}
