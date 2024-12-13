import { injectable } from 'tsyringe';
import { createServer } from 'http';
import mysql, { Pool } from 'mysql2';

import { HttpDomainModel } from '../model/domain/http-domain.model';
import {
  databaseNotReadyMsg,
  databaseReadyMsg,
  serverIsRunningMsg,
} from '../const/message.const';
import { getHttp } from '../service/http-decorator.service';

@injectable()
export class BuildHttpServerService {
  build(domain: HttpDomainModel) {
    const pool = this.createMysqlConnection(domain);
    this.waitForConnection(pool);
    const server = createServer((req, res) => {
      // Ustawienie nagłówków CORS
      res.setHeader('Access-Control-Allow-Origin', '*'); // Pozwól na dostęp z dowolnej domeny
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      ); // Pozwól na te metody HTTP
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      ); // Pozwól na te nagłówki
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // Umożliwienie używania ciasteczek, jeśli potrzebne

      // Obsługa preflight request (opcjonalne)
      if (req.method === 'OPTIONS') {
        // Odpowiedz na zapytanie OPTIONS bez wykonywania dalszego kodu
        res.writeHead(204); // No Content
        res.end();
        return;
      }
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

  private createMysqlConnection(domain: HttpDomainModel) {
    return mysql.createPool({
      host: domain.mysql.host,
      user: 'admin',
      password: 'admin',
      database: domain.mysql.database,
      port: domain.mysql.port,
    });
  }

  private async waitForConnection(pool: Pool) {
    let connected = false;
    while (!connected) {
      try {
        await pool.promise().query('SELECT 1');
        connected = true;
        console.log(databaseReadyMsg);
      } catch {
        console.log(databaseNotReadyMsg);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
}
