export interface RouteConfigModel {
  url: string;
  method: string;
  controller: string;
}

export interface ServerConfigModel {
  routes: Record<string, RouteConfigModel>;
}
