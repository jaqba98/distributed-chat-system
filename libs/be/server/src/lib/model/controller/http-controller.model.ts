import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'mysql2';

export interface HttpControllerModel {
  build: (req: IncomingMessage, res: ServerResponse, connection: Pool) => void;
}
