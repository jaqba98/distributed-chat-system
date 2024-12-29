// done
import { runServer } from '@distributed-chat-system/be-server';

import './controller/create-room.controller';
import './controller/fetch-account.controller';
import './controller/get-rooms.controller';
import './controller/logout.controller';
import './controller/protected.controller';
import './controller/protected.controller';
import './controller/sign-in.controller';
import './controller/sign-up.controller';
import './controller/room-sign-in.controller';
import './controller/room-protected.controller';

runServer();
