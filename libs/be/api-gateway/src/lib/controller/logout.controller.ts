// done
import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  HostnameEnum,
} from '@distributed-chat-system/be-server';
import { TokenDtoModel } from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@injectable()
@RegisterHttp('logoutController')
export class LogoutController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: TokenDtoModel) => {
      this.httpReq.postEndpoint<TokenDtoModel>(
        HostnameEnum.accountsLoadBalancer,
        res,
        input,
        EndpointEnum.logout
      );
    });
  }
}
