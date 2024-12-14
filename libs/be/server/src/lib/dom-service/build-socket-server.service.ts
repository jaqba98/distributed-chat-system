import { injectable } from 'tsyringe';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

import { SocketDomainModel } from '../model/domain/socket-domain.model';
import { getSocket } from '../service/socket-decorator.service';

@injectable()
export class BuildSocketServerService {
  async build(domain: SocketDomainModel) {
    const pubClient = createClient({ url: 'redis://redis:6379' });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    const io = new Server({
      adapter: createAdapter(pubClient, subClient),
    });
    io.on('connection', (socket) => {
      getSocket(domain.controller).build(io, socket);
    });
    io.listen(3000);
  }
}
