import { IncomingMessage, ServerResponse } from 'http';
import { Connection } from 'mysql2';

export interface HttpControllerModel {
  build: (
    req: IncomingMessage,
    res: ServerResponse,
    connection: Connection
  ) => void;
}
