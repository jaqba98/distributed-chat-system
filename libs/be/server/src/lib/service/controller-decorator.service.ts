import { container } from 'tsyringe';

import { HttpController } from '../controller/http.controller';
import { SocketIoController } from '../controller/socket-io.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterController = (key: string) => (target: any) => {
  container.register(key, { useClass: target });
};

export const getHttpController = (key: string) =>
  container.resolve<HttpController>(key);

export const getSocketIoController = (key: string) =>
  container.resolve<SocketIoController>(key);
