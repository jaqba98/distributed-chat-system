import { injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerDecoratorModel } from '../model/decorator/server-decorator.model';

@injectable()
@RegisterServer(ServerTypeEnum.http)
export class HttpAppService implements ServerDecoratorModel {
  build() {
    console.log('http');
  }
}
