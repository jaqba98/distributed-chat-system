import { RouteDtoModel } from './route-dto.model';

export interface ServerDtoModel {
  routes: RouteDtoModel[];
  socketIO?: string;
}
