import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

@injectable()
export class BaseController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(_req: IncomingMessage, _res: ServerResponse) {
    throw new Error('Method not implemented!');
  }
}
