import { IncomingMessage, ServerResponse } from 'http';

export interface HttpControllerModel {
  build: (req: IncomingMessage, res: ServerResponse) => void;
}
