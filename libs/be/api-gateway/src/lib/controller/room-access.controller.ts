// done
import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  HostnameEnum,
} from '@distributed-chat-system/be-server';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import { RoomAccessDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('roomAccessController')
export class RoomAccessController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: RoomAccessDtoModel) => {
      this.httpReq.postEndpoint<RoomAccessDtoModel>(
        HostnameEnum.roomsLoadBalancer,
        res,
        input,
        EndpointEnum.roomAccess
      );
    });
  }
}
