import { singleton } from 'tsyringe';

import { EnvModel } from '../model/env.model';

@singleton()
export class BuildEnvService {
  private _env?: EnvModel;

  get env() {
    if (this._env) return this._env;
    throw new Error('Env configuratoin was not created!');
  }

  build() {
    this._env = { port: 3000 };
  }
}
