export interface RouteModel {
  method?: string;
  url?: string;
  controller?: string;
}

export interface RouteDtoModel extends RouteModel {
  id: string;
}
