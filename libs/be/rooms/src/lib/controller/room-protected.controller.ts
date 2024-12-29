// done
import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';

import {
  HttpControllerModel,
  HttpReqUtilsService,
  HttpResUtils,
  JWT_SECRET_KEY,
  RegisterHttp,
} from '@distributed-chat-system/be-server';
import { RoomProtectedDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
@RegisterHttp('roomProtectedController')
export class RoomProtectedController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private readonly httpReq: HttpReqUtilsService,
    @inject(HttpResUtils) private readonly httpRes: HttpResUtils
  ) {}

  build(req: IncomingMessage, res: ServerResponse) {
    this.httpReq.post(req, async (dto: RoomProtectedDtoModel) => {
      const { token, name } = dto;
      if (!token) {
        this.httpRes.jsonOkMessage('Invalid token!', false, res);
        return;
      }
      try {
        const data = verify(token, JWT_SECRET_KEY);
        if (typeof data === 'string') {
          this.httpRes.jsonOkMessage('Invalid token!', false, res);
          return;
        }
        const obj = data as Pick<RoomProtectedDtoModel, 'name'>;
        if (obj.name === name) {
          this.httpRes.jsonOkMessage('Token correct!', true, res);
        } else {
          this.httpRes.jsonOkMessage('Invalid token!', false, res);
        }
        return;
      } catch {
        this.httpRes.jsonOkMessage('Invalid token!', false, res);
        return;
      }
    });
  }
}
