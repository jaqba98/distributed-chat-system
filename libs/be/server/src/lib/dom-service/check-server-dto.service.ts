import { injectable } from 'tsyringe';

import { ServerDtoModel } from '../model/dto/server-dto.model';

@injectable()
export class CheckServerDtoService {
  check(dto: ServerDtoModel): void {
    console.log(dto);
  }
}
