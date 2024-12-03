export interface ControllerModel {
  controller: string;
}

export interface RouteModel extends ControllerModel {
  method: string;
  url: string;
}

export interface ServerRouteDtoModel extends RouteModel {
  id: string;
}

export type ServerRouteDtoPartialType = Partial<ServerRouteDtoModel>;
