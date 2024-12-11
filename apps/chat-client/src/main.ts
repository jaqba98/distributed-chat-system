import { bootstrapApplication } from '@angular/platform-browser';

import { MainComponent } from '@distributed-chat-system/fe-main';
import { appConfig } from './app/app.config';

bootstrapApplication(MainComponent, appConfig).catch((err) =>
  console.error(err)
);
