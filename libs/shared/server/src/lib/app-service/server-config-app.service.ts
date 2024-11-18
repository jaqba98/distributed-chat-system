import { ServersConfigService } from '../dom-service/server-config.service';
import { ServerType } from '../type/server.type';

export class ServersConfigAppService {
  constructor(private serversConfig: ServersConfigService) {
    this.serversConfig = new ServersConfigService();
  }

  getPort(type: ServerType) {
    return this.serversConfig.getPort(type);
  }

  getRoute(type: ServerType, url?: string, method?: string) {
    return this.serversConfig.getRoute(type, url, method);
  }
}
