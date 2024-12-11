import { bootstrapApplication } from '@angular/platform-browser';

import { FeChatClientMainComponent } from '@distributed-chat-system/fe-main';
import { appConfig } from './app/app.config';

bootstrapApplication(FeChatClientMainComponent, appConfig).catch((err) =>
  console.error(err)
);
