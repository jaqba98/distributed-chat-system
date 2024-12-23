import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';
import { injectable, inject } from 'tsyringe';

import {
  RegisterHttp,
  HttpControllerModel,
  HttpReqUtilsService,
} from '@distributed-chat-system/be-server';
import {
  ResponseDtoModel,
  SignUpDtoModel,
  UsersDtoModel,
} from '@distributed-chat-system/shared-model';
import { validateEmail } from '@distributed-chat-system/shared-utils';

@injectable()
@RegisterHttp('signUpController')
export class SignUpController implements HttpControllerModel {
  constructor(
    @inject(HttpReqUtilsService) private httpReq: HttpReqUtilsService
  ) {}

  build(req: IncomingMessage, res: ServerResponse, pool: Pool) {
    this.httpReq.post(req, async (data: SignUpDtoModel) => {
      const { nick, email, password, rePassword } = data;
      if (nick.length === 0) {
        this.sendRes(res, 'Nickname cannot be empty.');
        return;
      }
      if (!validateEmail(email)) {
        this.sendRes(res, 'Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        this.sendRes(res, 'Password must be at least 6 characters long.');
        return;
      }
      if (password !== rePassword) {
        this.sendRes(res, 'Passwords must be the same!');
        return;
      }
      const selectNick = `SELECT nick FROM users WHERE nick="${nick}"`;
      const selectEmail = `SELECT email FROM users WHERE email="${email}"`;
      const [resultNick] = await pool.promise().query(selectNick);
      if ((<UsersDtoModel>resultNick).length > 0) {
        this.sendRes(res, 'Nick is already in use!');
        return;
      }
      const [resultEmail] = await pool.promise().query(selectEmail);
      if ((<UsersDtoModel>resultEmail).length > 0) {
        this.sendRes(res, 'Email is already in use!');
        return;
      }
      const insert = `INSERT INTO users (nick, email, password) VALUES ("${nick}", "${email}", ${password})`;
      pool.query(insert);
      this.sendRes(res, 'Registered successfully!', true);
    });
  }

  private sendRes(res: ServerResponse, msg: string, success = false) {
    const data: ResponseDtoModel<string> = { data: msg, success };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
}
