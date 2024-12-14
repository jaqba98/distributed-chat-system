import { container } from 'tsyringe';

import { SocketControllerModel } from '../model/controller/socket-controller.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterSocket = (key: string) => (target: any) => {
  container.register(key, { useClass: target });
};

export const getSocket = (key: string) => {
  return container.resolve<SocketControllerModel>(key);
};
