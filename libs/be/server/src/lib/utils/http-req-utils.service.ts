import { injectable } from 'tsyringe';
import { IncomingMessage } from 'http';

@injectable()
export class HttpReqUtilsService {
  post<T>(req: IncomingMessage, callback: (data: T) => void) {
    let body: string;
    req.on('data', (chunk) => (body = chunk));
    req.on('end', () => {
      const obj = JSON.parse(body) as T;
      callback(obj);
    });
  }
}
