import { inject, injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { BuildHttpDtoService } from '../infrastructure/build-http-dto.service';
import { BuildHttpDomainService } from '../dom-service/build-http-domain.service';
import { BuildHttpServerService } from '../dom-service/build-http-server.service';
import { ServerControllerModel } from '../model/controller/server-controller.model';

@injectable()
@RegisterServer(ServerTypeEnum.http)
export class HttpAppService implements ServerControllerModel {
  constructor(
    @inject(BuildHttpDtoService) private buildDto: BuildHttpDtoService,
    @inject(BuildHttpDomainService) private buildDomain: BuildHttpDomainService,
    @inject(BuildHttpServerService) private buildHttp: BuildHttpServerService
  ) {}

  build() {
    const dto = this.buildDto.build();
    const domain = this.buildDomain.build(dto);
    this.buildHttp.build(domain);
  }
}
