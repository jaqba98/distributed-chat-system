import 'reflect-metadata';
import { container } from 'tsyringe';

import { BeServer } from '@distributed-chat-system/be-server';

container.resolve(BeServer).startServer(3000);
