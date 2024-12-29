// done
import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  HostnameEnum,
} from '@distributed-chat-system/be-server';
import { RoomProtectedDtoModel } from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@injectable()
@RegisterHttp('roomProtectedController')
export class RoomProtectedController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: RoomProtectedDtoModel) => {
      this.httpReq.postEndpoint<RoomProtectedDtoModel>(
        HostnameEnum.roomsLoadBalancer,
        res,
        input,
        EndpointEnum.roomProtected
      );
    });
  }
}
