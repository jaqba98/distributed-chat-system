import { Route } from '@angular/router';

import { RegistrationPageComponent } from '@distributed-chat-system/fe-pages';

export const chatClientRoutes: Route[] = [
  {
    component: RegistrationPageComponent,
    path: '/',
  },
];
