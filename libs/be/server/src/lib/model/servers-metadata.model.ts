import { ServerType } from '../type/server.type';

export interface ServerMetadataModel {
  port: number;
}

export interface ServersMetadataModel {
  servers: Record<ServerType, ServerMetadataModel>;
}
