interface ControllerDomainModel {
  method: string;
  url: string;
  controller: string;
}

interface MethodDomainModel {
  urls: Record<string, ControllerDomainModel>;
}

interface RoutesDomainModel {
  methods: Record<string, MethodDomainModel>;
}

export interface HttpDomainModel {
  routes: Record<string, RoutesDomainModel>;
}
