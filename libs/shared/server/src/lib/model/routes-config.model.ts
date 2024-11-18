import { ControllerType } from '../type/controller.type';
import { MethodType } from '../type/method.type';
import { RouteType } from '../type/route.type';

export interface RouteServerModel {
  controller: ControllerType;
}

type RouteConfigType = Record<MethodType, RouteServerModel>;

type PartialRouteConfigType = Partial<RouteConfigType>;

export interface RoutesConfigModel {
  routes: Record<RouteType, PartialRouteConfigType>;
}
