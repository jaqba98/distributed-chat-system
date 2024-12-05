import { injectable } from 'tsyringe';

import { SERVER_TYPE } from '../const/env.const';
import { envNotCorrectValueMsg, envNotSetMsg } from '../const/message.const';
import { ServerTypeEnum } from '../enum/server-type.enum';

@injectable()
export class GetServerTypeService {
  get() {
    const serverType = process.env[SERVER_TYPE];
    if (!serverType) throw new Error(envNotSetMsg(SERVER_TYPE));
    if (serverType in ServerTypeEnum) return serverType as ServerTypeEnum;
    throw new Error(
      envNotCorrectValueMsg(
        SERVER_TYPE,
        serverType,
        Object.keys(ServerTypeEnum).join(',')
      )
    );
  }
}
