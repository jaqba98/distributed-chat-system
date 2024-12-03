import {
  ControllerDomainModel,
  RoutesDomainModel,
} from './routes-domain.model';

export interface ServerDomainModel {
  serverType: string;
  serverRoutes: RoutesDomainModel;
  serverSocketIO: ControllerDomainModel;
}
