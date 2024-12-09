import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
  StatusCodeEnum,
} from '@distributed-chat-system/be-server';
import { validateEmail } from '@distributed-chat-system/shared-utils';
import { RegisterModel } from '../model/register.model';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, (data: RegisterModel) => {
      const resultValidate = this.validateRegisterData(data);
      if (resultValidate === StatusCodeEnum.invalidInput) {
        res.writeHead(resultValidate, { 'Content-Type': 'application/json' });
        res.end(resultValidate);
        return;
      }
      res.writeHead(resultValidate, { 'Content-Type': 'application/json' });
      res.end(resultValidate);
    });
    // TODO: Refactor the register logic
    // this.httpReq.post<RegisterModel>(req, (data) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   pool.query('SELECT * FROM users', (err, result, fields) => {
    //     res.writeHead(200, { 'Content-Type': 'plain/text' });
    //     res.end(result);
    //   });
    // });
  }

  private validateRegisterData(data: RegisterModel): StatusCodeEnum {
    const { email, password, rePassword } = data;
    if (!validateEmail(email)) return StatusCodeEnum.invalidInput;
    if (password !== rePassword) return StatusCodeEnum.invalidInput;
    return StatusCodeEnum.ok;
  }
}
