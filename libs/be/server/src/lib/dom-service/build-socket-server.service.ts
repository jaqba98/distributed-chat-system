import { injectable } from 'tsyringe';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import mysql, { Pool } from 'mysql2';

import { SocketDomainModel } from '../model/domain/socket-domain.model';
import { getSocket } from '../service/socket-decorator.service';
import { databaseNotReadyMsg, databaseReadyMsg } from '../const/message.const';

@injectable()
export class BuildSocketServerService {
  async build(domain: SocketDomainModel) {
    const pool = this.createMysqlConnection(domain);
    this.waitForConnection(pool);
    const pubClient = createClient({ url: 'redis://redis:6379' });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    const io = new Server({
      adapter: createAdapter(pubClient, subClient),
      cors: {
        origin: domain.mysql.cors,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
      },
    });
    io.on('connection', (socket) => {
      getSocket(domain.controller).build(io, socket, pool);
    });
    io.listen(3000);
  }

  private createMysqlConnection(domain: SocketDomainModel) {
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
