export interface MySqlDtoModel {
  host: string;
  database: string;
  port: string;
  cors: string;
}

export interface SocketDtoModel {
  controller: string;
  mysql: Partial<MySqlDtoModel>;
}

export type SocketDtoType = Partial<SocketDtoModel>;
