interface RouteDtoModel {
  method: string;
  url: string;
  controller: string;
}

export interface HttpRouteDtoModel extends Partial<RouteDtoModel> {
  id: string;
}

export interface HttpDtoModel {
  routes: HttpRouteDtoModel[];
}

export type HttpDtoType = Partial<HttpDtoModel>;
