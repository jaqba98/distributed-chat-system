// done
import { runServer } from '@distributed-chat-system/be-server';

import './controller/fetch-account.controller';
import './controller/logout.controller';
import './controller/protected.controller';
import './controller/sign-in.controller';
import './controller/sign-up.controller';

runServer();
