import { inject, injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import { validateEmail } from '@distributed-chat-system/shared-utils';
import { RegisterModel } from '../model/register.model';

@injectable()
@RegisterHttp('registerController')
export class RegisterController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (data: RegisterModel) => {
      const { nick, email, password, rePassword } = data;
      console.log(nick, email, password, rePassword);
      if (nick.length === 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'The nick is invalid!', data }));
        return;
      }
      if (!validateEmail(email)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'The email address is invalid!', data }));
        return;
      }
      if (password.length < 6) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'The password is invalid!' }));
        return;
      }
      if (password !== rePassword) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'Passwords must be the same!' }));
        return;
      }
      const select = `SELECT email FROM users WHERE email="${email}"`;
      const [result] = await pool.promise().query(select);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((<any>result).length === 0) {
        const insert = `INSERT INTO users (nick, email, password) VALUES ("${nick}", "${email}", "${password}")`;
        pool.query(insert);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'Registered successfully!' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ msg: 'Email is already in use!' }));
    });
  }
}
