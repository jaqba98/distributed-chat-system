interface MySqlDomainModel {
  host: string;
  database: string;
  port: number;
  cors: string;
}

export interface SocketDomainModel {
  controller: string;
  mysql: MySqlDomainModel;
}
