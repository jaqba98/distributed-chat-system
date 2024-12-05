import { injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerControllerModel } from '../model/controller/server-controller.model';

@injectable()
@RegisterServer(ServerTypeEnum.socket)
export class SocketAppService implements ServerControllerModel {
  build() {
    console.log('socket');
  }
}
