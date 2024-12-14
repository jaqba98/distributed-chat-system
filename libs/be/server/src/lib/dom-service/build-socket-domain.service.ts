import { injectable } from 'tsyringe';

import { envNotSetMsg } from '../const/message.const';
import { SocketDtoType } from '../model/dto/socket-dto.model';
import { SocketDomainModel } from '../model/domain/socket-domain.model';

@injectable()
export class BuildSocketDomainService {
  build(dto: SocketDtoType): SocketDomainModel {
    const { controller } = dto;
    if (!controller) throw new Error(envNotSetMsg('controller'));
    return { controller };
  }
}
