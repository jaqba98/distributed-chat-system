import { injectable } from 'tsyringe';
import * as express from 'express';

@injectable()
export class BeServer {
  startServer(port: number) {
    const app = express();
    app.get('/', (_req, res) => res.send('Hello World!'));
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
}
