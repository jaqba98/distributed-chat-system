import { container } from 'tsyringe';

import { HttpControllerModel } from '../model/controller/http-controller.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterHttp = (key: string) => (target: any) => {
  container.register(key, { useClass: target });
};

export const getHttp = (key: string) => {
  return container.resolve<HttpControllerModel>(key);
};
