interface ControllerDomainModel {
  controller: string;
}

interface MethodDomainModel {
  urls: Record<string, ControllerDomainModel>;
}

interface RoutesDomainModel {
  methods: Record<string, MethodDomainModel>;
}

interface MySqlDomainModel {
  host: string;
  database: string;
  port: number;
}

export interface HttpDomainModel {
  routes: RoutesDomainModel;
  mysql: MySqlDomainModel;
}
