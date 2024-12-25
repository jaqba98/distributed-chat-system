import { Route } from '@angular/router';

import {
  CreateRoomPageComponent,
  DashboardPageComponent,
  LogoutPageComponent,
  RoomPageComponent,
  RoomsPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
} from '@distributed-chat-system/fe-pages';
import {
  ProtectedGuard,
  NotProtectedGuard,
  LogoutGuard,
  FetchAccountGuard,
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
    canActivate: [ProtectedGuard, FetchAccountGuard],
    children: [
      {
        path: 'room/:id',
        component: RoomPageComponent,
        canActivate: [ProtectedGuard, FetchAccountGuard],
      },
      {
        path: 'rooms',
        component: RoomsPageComponent,
        canActivate: [ProtectedGuard, FetchAccountGuard],
      },
      {
        path: 'create-room',
        component: CreateRoomPageComponent,
        canActivate: [ProtectedGuard, FetchAccountGuard],
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
