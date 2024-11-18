// TODO: Refactor the service which is responsible for conver the env data
// into server model
import { singleton } from 'tsyringe';

@singleton()
export class ServerEnvService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  init() {
    const port = this.getPortEnvVar();
    const routes = this.getRoutesEnvVar();
    this.data = { port, routes };
  }

  private getPortEnvVar() {
    const envVarVal = this.getEnvVar('SERVER_PORT');
    // convert to number
    return envVarVal;
  }

  private getRoutesEnvVar() {
    return this.getEnvVar('SERVER_ROUTES').replace(/\s+/g, '').split(',');
  }

  private getEnvVar(envVar: string) {
    const envVarVal = process.env[envVar];
    if (envVarVal) {
      return envVarVal;
    }
    throw new Error(
      `Environment variable ${envVar} not defined for application!`
    );
  }
}
