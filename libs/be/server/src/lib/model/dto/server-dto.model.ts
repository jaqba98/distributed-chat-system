import {
  ControllerModel,
  ServerRouteDtoPartialType,
} from './server-route-dto.model';

export interface ServerDtoModel {
  serverType: string;
  serverRoutes: ServerRouteDtoPartialType[];
  serverSocketIO: ControllerModel;
}

export type ServerDtoPartialType = Partial<ServerDtoModel>;
