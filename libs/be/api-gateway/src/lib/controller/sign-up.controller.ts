// done
import { IncomingMessage, ServerResponse } from 'http';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  HostnameEnum,
} from '@distributed-chat-system/be-server';
import { SignUpDtoModel } from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@injectable()
@RegisterHttp('signUpController')
export class SignUpController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (input: SignUpDtoModel) => {
      this.httpReq.postEndpoint<SignUpDtoModel>(
        HostnameEnum.accountsLoadBalancer,
        res,
        input,
        EndpointEnum.signUp
      );
    });
  }
}
