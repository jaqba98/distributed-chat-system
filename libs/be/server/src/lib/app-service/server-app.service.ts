import { injectable, inject } from 'tsyringe';

import { BuildServerDtoService } from '../infrastructure/build-server-dto.service';
import { CheckServerDtoService } from '../dom-service/check-server-dto.service';
import { BuildServerDomainService } from '../dom-service/build-server-domain.service';
import { BuildServerService } from '../dom-service/build-server.service';

@injectable()
export class ServerAppService {
  constructor(
    @inject(BuildServerDtoService) private buildDto: BuildServerDtoService,
    @inject(CheckServerDtoService) private checkDto: CheckServerDtoService,
    @inject(BuildServerDomainService) private domain: BuildServerDomainService,
    @inject(BuildServerService) private server: BuildServerService
  ) {}

  runServer() {
    const dto = this.buildDto.build();
    this.checkDto.check(dto);
    const domain = this.domain.build(dto);
    this.server.build(domain);
  }
}
