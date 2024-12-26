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
import { RoomDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('createRoomController')
export class CreateRoomController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: Omit<RoomDtoModel, 'id'>) => {
      this.httpReq.postEndpoint<Omit<RoomDtoModel, 'id'>>(
        HostnameEnum.roomsLoadBalancer,
        res,
        input,
        EndpointEnum.dashboardCreateRoom
      );
    });
  }
}
