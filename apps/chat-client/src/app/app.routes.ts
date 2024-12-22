import { Route } from '@angular/router';

import {
  CreateRoomPageComponent,
  DashboardPageComponent,
  LogoutPageComponent,
  RoomPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
} from '@distributed-chat-system/fe-pages';
import {
  ProtectedGuard,
  NotProtectedGuard,
  LogoutGuard,
} from '@distributed-chat-system/fe-guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [ProtectedGuard],
    children: [
      {
        path: 'room/:id',
        component: RoomPageComponent,
        canActivate: [ProtectedGuard],
      },
      {
        path: 'create-room',
        component: CreateRoomPageComponent,
        canActivate: [ProtectedGuard],
      },
    ],
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
  {
    path: 'logout',
    component: LogoutPageComponent,
    canActivate: [ProtectedGuard, LogoutGuard],
  },
];
