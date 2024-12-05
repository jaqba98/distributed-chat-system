import { inject, injectable } from 'tsyringe';

import { RegisterServer } from '../service/server-decorator.service';
import { ServerTypeEnum } from '../enum/server-type.enum';
import { ServerDecoratorModel } from '../model/decorator/server-decorator.model';
import { BuildHttpDtoService } from '../infrastructure/build-http-dto.service';

@injectable()
@RegisterServer(ServerTypeEnum.http)
export class HttpAppService implements ServerDecoratorModel {
  constructor(
    @inject(BuildHttpDtoService) private buildDto: BuildHttpDtoService
  ) {}

  build() {
    const dto = this.buildDto.build();
    console.log(dto);
  }
}
