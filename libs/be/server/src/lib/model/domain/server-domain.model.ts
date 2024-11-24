import {
  ControllerDomainModel,
  RoutesDomainModel,
} from './routes-domain.model';

export interface ServerDomainModel {
  routes: RoutesDomainModel;
  socketIO: ControllerDomainModel;
}
