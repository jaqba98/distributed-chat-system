import { runServer } from '@distributed-chat-system/be-server';

import './controller/sign-in.controller';
import './controller/sign-up.controller';
import './controller/protected.controller';
import './controller/logout.controller';
import './controller/create-room.controller';
import './controller/get-rooms.controller';
import './controller/fetch-account.controller';

runServer();
