// done
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { RoomTokenService } from '@distributed-chat-system/fe-system';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import {
  ResponseDtoModel,
  RoomProtectedDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@Injectable({ providedIn: 'root' })
export class RoomProtectedGuard implements CanActivate {
  constructor(
    private readonly roomToken: RoomTokenService,
    private readonly router: Router,
    private readonly http: HttpUtils
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    if (!id) return false;
    const dto: RoomProtectedDtoModel = {
      token: this.roomToken.getToken(),
      name: id,
    };
    return await this.http.post<
      RoomProtectedDtoModel,
      ResponseDtoModel<void>,
      boolean
    >(dto, EndpointEnum.roomProtected, (response) => {
      const { success } = response;
      if (success) return true;
      this.router.navigate(['/dashboard']);
      return false;
    });
  }
}
