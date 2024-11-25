import { injectable, inject } from 'tsyringe';

import { BuildServerDtoService } from '../infrastructure/build-server-dto.service';
import { CheckServerDtoService } from '../dom-service/check-server-dto.service';

@injectable()
export class ServerAppService {
  constructor(
    @inject(BuildServerDtoService) private buildDto: BuildServerDtoService,
    @inject(CheckServerDtoService) private checkDto: CheckServerDtoService
  ) {}

  runServer() {
    const dto = this.buildDto.build();
    this.checkDto.check(dto);
  }
}
