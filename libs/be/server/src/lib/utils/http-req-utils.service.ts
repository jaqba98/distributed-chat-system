import { injectable } from 'tsyringe';
import { IncomingMessage } from 'http';

@injectable()
export class HttpReqUtilsService {
  post(req: IncomingMessage, callback: (body: string) => void) {
    let body = '';
    req.on('data', (chunk) => (body = chunk));
    req.on('end', () => {
      callback(body);
    });
  }
}
