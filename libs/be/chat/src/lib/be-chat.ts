import { runServer } from '@distributed-chat-system/be-server';

import './controller/root.controller';
import './controller/hello.controller';
import './controller/chat.controller';

runServer();
