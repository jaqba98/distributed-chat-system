import { inject, injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerControllerModel } from '../model/controller/server-controller.model';
import { BuildSocketDtoService } from '../infrastructure/build-socket-dto.service';

@injectable()
@RegisterServer(ServerTypeEnum.socket)
export class SocketAppService implements ServerControllerModel {
  constructor(
    @inject(BuildSocketDtoService) private buildDto: BuildSocketDtoService
  ) {}

  build() {
    const dto = this.buildDto.build();
    console.log(dto);
  }
}
