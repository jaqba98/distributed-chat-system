// done
import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';

import { RoomTokenService } from '@distributed-chat-system/fe-system';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import {
  ResponseDtoModel,
  RoomProtectedDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomProtectedGuard implements CanActivate {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomToken: RoomTokenService,
    private readonly http: HttpUtils
  ) {}

  async canActivate() {
    const paramMap = await firstValueFrom(this.route.paramMap);
    const name = paramMap.get('name');
    if (!name) return false;
    const dto: RoomProtectedDtoModel = {
      token: this.roomToken.getToken(),
      name,
    };
    return await this.http.post<
      RoomProtectedDtoModel,
      ResponseDtoModel<void>,
      boolean
    >(dto, EndpointEnum.roomProtected, (response) => {
      return response.success;
    });
  }
}
