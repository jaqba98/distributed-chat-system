import { container } from 'tsyringe';

import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerControllerModel } from '../model/controller/server-controller.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterServer = (key: ServerTypeEnum) => (target: any) => {
  container.register(key, { useClass: target });
};

export const getServer = (key: ServerTypeEnum) => {
  return container.resolve<ServerControllerModel>(key);
};
