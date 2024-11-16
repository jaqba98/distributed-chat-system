import { ServersType } from '../type/servers.type';

export interface ServerMetadataModel {
  port: number;
}

export interface ServersMetadataModel {
  servers: Record<ServersType, ServerMetadataModel>;
}
