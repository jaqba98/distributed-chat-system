import { injectable } from 'tsyringe';

import { HttpDomainModel } from '../model/domain/http-domain.model';
import { HttpDtoType } from '../model/dto/http-dto.model';

@injectable()
export class BuildHttpDomainService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(dto: HttpDtoType): HttpDomainModel {
    return {
      routes: this.buildRoutes(),
    };
  }

  private buildRoutes(): HttpDomainModel['routes'] {
    return {};
  }
}
