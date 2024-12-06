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
}

export interface HttpDomainModel {
  routes: RoutesDomainModel;
  mysql: MySqlDomainModel;
}
