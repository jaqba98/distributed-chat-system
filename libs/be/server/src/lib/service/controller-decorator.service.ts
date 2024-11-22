import { container } from 'tsyringe';

import { BaseController } from '../controller/base.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterController = (key: string) => (target: any) => {
  container.register(key, { useClass: target });
};

export const getController = (key: string) =>
  container.resolve<BaseController>(key);
