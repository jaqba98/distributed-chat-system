import { injectable } from 'tsyringe';
import { IncomingMessage, ServerResponse } from 'http';

import { methodNotImplementedMsg } from '../const/message.const';

@injectable()
export class HttpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(_req: IncomingMessage, _res: ServerResponse) {
    throw new Error(methodNotImplementedMsg);
  }
}
