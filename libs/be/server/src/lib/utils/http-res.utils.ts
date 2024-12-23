// done
import { injectable } from 'tsyringe';
import { ServerResponse } from 'http';

import { ResponseDtoModel } from '@distributed-chat-system/shared-model';

@injectable()
export class HttpResUtils {
  jsonOkMessage(data: string, success: boolean, res: ServerResponse) {
    const dto: ResponseDtoModel<string> = { data, success };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dto));
  }

  jsonOk<TData>(data: TData, success: boolean, res: ServerResponse) {
    const dto: ResponseDtoModel<TData> = { data, success };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dto));
  }
}
