import { ControllerType } from '../type/controller.type';
import { MethodType } from '../type/method.type';
import { PortType } from '../type/port.type';
import { RouteType } from '../type/route.type';
import { ServerType } from '../type/server.type';

export interface RouteServerConfigModel {
  controller: ControllerType;
}

export type RouteServerConfigType = Record<MethodType, RouteServerConfigModel>;

export type PartialRouteServerConfigType = Partial<RouteServerConfigType>;

export interface RoutesServerConfigModel {
  routes: Record<RouteType, PartialRouteServerConfigType>;
}

export interface ServerConfigModel extends RoutesServerConfigModel {
  port: PortType;
}

export interface ServersConfigModel {
  servers: Record<ServerType, ServerConfigModel>;
}
