// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { RoomTokenService } from '@distributed-chat-system/fe-system';
import { FlexComponent } from '@distributed-chat-system/fe-controls';
import {
  ResponseDtoModel,
  RoomSignInDtoModel,
} from '@distributed-chat-system/shared-model';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import { firstValueFrom } from 'rxjs';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@Component({
  selector: 'lib-room-sign-in-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexComponent,
    FloatLabelModule,
    ButtonModule,
    Message,
    InputTextModule,
  ],
  templateUrl: './room-sign-in-form.component.html',
  styleUrl: './room-sign-in-form.component.scss',
})
export class RoomSignInFormComponent {
  roomSignInForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomToken: RoomTokenService,
    private readonly router: Router,
    private readonly http: HttpUtils
  ) {
    this.roomSignInForm = new FormGroup({
      password: new FormControl(''),
    });
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  async onSubmit() {
    const paramMap = await firstValueFrom(this.route.paramMap);
    const name = paramMap.get('name');
    if (!name) return;
    const dto: RoomSignInDtoModel = {
      name,
      password: this.roomSignInForm.get('password')?.value,
    };
    await this.http.post<RoomSignInDtoModel, ResponseDtoModel<string>, void>(
      dto,
      EndpointEnum.roomSignIn,
      (response) => {
        this.roomSignInForm.reset();
        this.roomSignInForm.markAsUntouched();
        const { data, success } = response;
        if (success) {
          this.roomToken.saveToken(data);
          this.router.navigate(['dashboard', 'room', name]);
          return;
        }
        this.isSubmited = true;
        this.responseMessage = data;
        this.responseSuccess = success;
      }
    );
  }
}
