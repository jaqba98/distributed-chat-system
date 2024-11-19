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
    const port = this.buildPort();
    this._env = { port };
  }

  private buildPort() {
    const { SERVER_PORT } = process.env;
    if (SERVER_PORT) {
      const portNum = Number(SERVER_PORT);
      if (portNum) return portNum;
      throw new Error('The port is not a number!');
    }
    throw new Error('The port was not given!');
  }
}
