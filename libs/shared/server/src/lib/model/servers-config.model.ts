import { PortType } from '../type/port.type';
import { ServerType } from '../type/server.type';
import { RoutesConfigModel } from './routes-config.model';

export interface ServerConfigModel extends RoutesConfigModel {
  port: PortType;
}

export interface ServersConfigModel {
  servers: Record<ServerType, ServerConfigModel>;
}
