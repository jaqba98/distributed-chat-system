interface ControllerDomainModel {
  controller: string;
}

interface MethodDomainModel {
  urls: Record<string, ControllerDomainModel>;
}

interface RoutesDomainModel {
  methods: Record<string, MethodDomainModel>;
}

export interface HttpDomainModel {
  routes: RoutesDomainModel;
}
