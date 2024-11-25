import { injectable, inject } from 'tsyringe';

import { BuildServerDtoService } from '../infrastructure/build-server-dto.service';

@injectable()
export class ServerAppService {
  constructor(
    @inject(BuildServerDtoService) private buildServerDto: BuildServerDtoService
  ) {}

  runServer() {
    const dto = this.buildServerDto.build();
    console.log(dto);
  }
}
