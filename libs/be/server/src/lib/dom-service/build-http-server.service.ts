import { injectable } from 'tsyringe';
import { createServer } from 'http';
import mysql from 'mysql2';

import { HttpDomainModel } from '../model/domain/http-domain.model';
import { serverIsRunningMsg } from '../const/message.const';
import { getHttp } from '../service/http-decorator.service';

@injectable()
export class BuildHttpServerService {
  build(domain: HttpDomainModel) {
    const pool = mysql.createPool({
      host: domain.mysql.host,
      user: 'admin',
      password: 'admin',
      database: domain.mysql.database,
      port: domain.mysql.port,
    });

    // Test the connection
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
      }
      console.log('Connected to MySQL successfully!');
      connection.release();
    });

    const waitForConnection = async () => {
      let connected = false;
      while (!connected) {
        try {
          await pool.promise().query('SELECT 1');
          connected = true;
          console.log('Database is ready!');
        } catch (err) {
          console.log('Waiting for database...');
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    };
    waitForConnection();

    const server = createServer((req, res) => {
      const method = req.method ?? '';
      const url = req.url ?? '';
      const { methods } = domain.routes;
      if (method in methods && url in methods[method].urls) {
        const { controller } = methods[method].urls[url];
        getHttp(controller).build(req, res, pool);
      } else {
        getHttp('http404Controller').build(req, res, pool);
      }
    });
    server.listen(3000, () => console.log(serverIsRunningMsg));
  }
}
