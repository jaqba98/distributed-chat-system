import { injectable, inject } from 'tsyringe';

import { BuildServerDtoService } from '../infrastructure/build-server-dto.service';
import { CheckServerDtoService } from '../dom-service/check-server-dto.service';
import { BuildServerDomainService } from '../dom-service/build-server-domain.service';

@injectable()
export class ServerAppService {
  constructor(
    @inject(BuildServerDtoService) private buildDto: BuildServerDtoService,
    @inject(CheckServerDtoService) private checkDto: CheckServerDtoService,
    @inject(BuildServerDomainService) private domain: BuildServerDomainService
  ) {}

  runServer() {
    const dto = this.buildDto.build();
    this.checkDto.check(dto);
    const domain = this.domain.build(dto);
    console.log(domain);
  }
}
