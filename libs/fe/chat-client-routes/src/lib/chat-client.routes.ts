import { Route } from '@angular/router';

import { RegistrationPageComponent } from '@distributed-chat-system/fe-chat-client-pages';

export const chatClientRoutes: Route[] = [
  {
    component: RegistrationPageComponent,
    path: '/',
  },
];
