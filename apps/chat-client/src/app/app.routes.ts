import { Route } from '@angular/router';

import {
  RoomsPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
} from '@distributed-chat-system/fe-pages';
import {
  ProtectedGuard,
  NotProtectedGuard,
} from '@distributed-chat-system/fe-guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
  {
    path: 'rooms',
    component: RoomsPageComponent,
    canActivate: [ProtectedGuard],
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [NotProtectedGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [NotProtectedGuard],
  },
];
