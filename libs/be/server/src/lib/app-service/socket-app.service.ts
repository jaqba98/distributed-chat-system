import { injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerDecoratorModel } from '../model/decorator/server-decorator.model';

@injectable()
@RegisterServer(ServerTypeEnum.socket)
export class SocketAppService implements ServerDecoratorModel {
  build() {
    console.log('socket');
  }
}
