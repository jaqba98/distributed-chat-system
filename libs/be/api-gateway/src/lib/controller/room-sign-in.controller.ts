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
import { RoomSignInDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('roomSignInController')
export class RoomSignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: RoomSignInDtoModel) => {
      this.httpReq.postEndpoint<RoomSignInDtoModel>(
        HostnameEnum.roomsLoadBalancer,
        res,
        input,
        EndpointEnum.roomSignIn
      );
    });
  }
}
