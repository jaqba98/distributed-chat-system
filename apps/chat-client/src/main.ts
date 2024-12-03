import { bootstrapApplication } from '@angular/platform-browser';

import { FeChatClientMainComponent } from '@distributed-chat-system/fe-chat-client-main';
import { appConfig } from './app/app.config';

bootstrapApplication(FeChatClientMainComponent, appConfig).catch((err) =>
  console.error(err)
);
