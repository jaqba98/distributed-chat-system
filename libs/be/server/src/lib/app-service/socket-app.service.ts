import { inject, injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerControllerModel } from '../model/controller/server-controller.model';
import { BuildSocketDtoService } from '../infrastructure/build-socket-dto.service';
import { BuildSocketDomainService } from '../dom-service/build-socket-domain.service';

@injectable()
@RegisterServer(ServerTypeEnum.socket)
export class SocketAppService implements ServerControllerModel {
  constructor(
    @inject(BuildSocketDtoService) private buildDto: BuildSocketDtoService,
    @inject(BuildSocketDomainService)
    private buildDomain: BuildSocketDomainService
  ) {}

  build() {
    const dto = this.buildDto.build();
    const domain = this.buildDomain.build(dto);
    console.log(domain);
  }
}
