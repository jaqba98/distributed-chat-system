export interface ControllerDomainModel {
  controller: string;
}

export interface MethodDomainModel {
  urls: Record<string, ControllerDomainModel>;
}

export interface RoutesDomainModel {
  methods: Record<string, MethodDomainModel>;
}
