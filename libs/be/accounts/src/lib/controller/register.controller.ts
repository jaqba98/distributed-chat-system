import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import {
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

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, (data: RegisterModel) => {
      const { email, password, rePassword } = data;
      if (!validateEmail(email)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'The email address is invalid!' }));
        return;
      }
      if (!validatePassword(password)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'The password address is invalid!' }));
        return;
      }
      if (password !== rePassword) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'Passwords must be the same!' }));
        return;
      }
      const select = `SELECT email FROM users WHERE email="${email}"`;
      pool.query(select, (_, result) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((<any>result).length === 0) {
          const insert = `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`;
          pool.query(insert);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ msg: 'Registered successfully!' }));
          return;
        }
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'Email is already in use!' }));
      });
    });
  }
}
