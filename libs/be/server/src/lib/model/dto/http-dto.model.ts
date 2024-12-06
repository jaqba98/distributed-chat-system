interface RouteDtoModel {
  method: string;
  url: string;
  controller: string;
}

export interface HttpRouteDtoModel extends Partial<RouteDtoModel> {
  id: string;
}

export interface MySqlDtoModel {
  host: string;
  database: string;
}

export interface HttpDtoModel {
  routes: HttpRouteDtoModel[];
  mysql: Partial<MySqlDtoModel>;
}

export type HttpDtoType = Partial<HttpDtoModel>;
