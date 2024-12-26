import { injectable } from 'tsyringe';
import { IncomingMessage, request, ServerResponse } from 'http';

import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import { HostnameEnum } from '../enum/hostname.enum';

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

  postEndpoint<TInput>(
    hostname: HostnameEnum,
    res: ServerResponse,
    input: TInput,
    endpoint: EndpointEnum
  ) {
    const inputText = JSON.stringify(input);
    const options = {
      hostname,
      port: 80,
      path: `/${endpoint}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(inputText),
      },
    };
    const reqAccounts = request(options, (resAccounts) => {
      let data = '';
      resAccounts.on('data', (chunk) => (data += chunk));
      resAccounts.on('end', () => res.end(data));
    });
    reqAccounts.write(inputText);
    reqAccounts.end();
  }
}
