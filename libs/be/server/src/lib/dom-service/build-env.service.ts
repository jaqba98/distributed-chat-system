import { singleton } from 'tsyringe';

interface EnvModel {
  port: number;
}

@singleton()
export class BuildEnvService {
  private _env?: EnvModel;

  get env() {
    if (this._env) return this._env;
    throw new Error('c');
  }

  build() {
    const port = this.buildPort();
    this._env = {
      port: port,
    };
  }

  private buildPort() {
    const port = process.env.SERVER_PORT;
    if (port) {
      const portNumber = Number(port);
      if (portNumber) return portNumber;
      throw new Error('b');
    }
    throw new Error('a');
  }
}
