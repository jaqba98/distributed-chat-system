// done
import { runServer } from '@distributed-chat-system/be-server';

import './controller/create-room.controller';
import './controller/get-rooms.controller';
import './controller/room-sign-in.controller';
import './controller/room-protected.controller';

runServer();
