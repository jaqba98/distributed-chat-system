import { ServersConfigService } from '../dom-service/server-config.service';
import { ServerType } from '../type/server.type';

export class ServersConfigAppService {
  private serversConfig: ServersConfigService;

  constructor() {
    this.serversConfig = new ServersConfigService();
  }

  getPort(type: ServerType) {
    return this.serversConfig.getPort(type);
  }

  getRoute(type: ServerType, url?: string, method?: string) {
    return this.serversConfig.getRoute(type, url, method);
  }
}
