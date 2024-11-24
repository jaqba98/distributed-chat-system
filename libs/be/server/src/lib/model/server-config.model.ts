export interface RouteConfigModel {
  url: string;
  method: string;
  controller: string;
}

export interface UrlsConfigModel {
  urls: Record<string, RouteConfigModel>;
}

export interface RoutesConfigModel {
  methods: Record<string, UrlsConfigModel>;
}

export interface ServerConfigModel {
  routes: RoutesConfigModel;
  socketIo: Pick<RouteConfigModel, 'controller'>;
}
