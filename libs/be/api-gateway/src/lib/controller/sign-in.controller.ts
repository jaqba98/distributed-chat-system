// done
import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  HostnameEnum,
} from '@distributed-chat-system/be-server';
import { SignInDtoModel } from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@injectable()
@RegisterHttp('signInController')
export class SignInController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: SignInDtoModel) => {
      this.httpReq.postEndpoint<SignInDtoModel>(
        HostnameEnum.accountsLoadBalancer,
        res,
        input,
        EndpointEnum.signIn
      );
    });
  }
}
