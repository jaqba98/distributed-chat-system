import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Connection } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import {
  ErrorCodeEnum,
  validateEmail,
  validatePassword,
} from '@distributed-chat-system/shared-utils';
import { RegisterModel } from '../model/register.model';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(req: IncomingMessage, res: ServerResponse, connection: Connection) {
    this.httpReq.post(req, (data: RegisterModel) => {
      const validate = this.validateRegisterData(data);
      if (validate !== ErrorCodeEnum.noError) {
        res.writeHead(400, { 'Content-Type': 'plain/text' });
        res.end(validate);
        return;
      }
      res.writeHead(400, { 'Content-Type': 'plain/text' });
      res.end('ok');
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

  private validateRegisterData(data: RegisterModel): ErrorCodeEnum {
    const { email, password, rePassword } = data;
    if (!validateEmail(email)) return ErrorCodeEnum.invalidEmail;
    if (!validatePassword(password)) return ErrorCodeEnum.invalidPassword;
    if (password !== rePassword) return ErrorCodeEnum.passwordsNotTheSame;
    return ErrorCodeEnum.noError;
  }
}
