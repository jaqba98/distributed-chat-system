// done
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { FlexComponent } from '@distributed-chat-system/fe-controls';
import {
  ResponseDtoModel,
  RoomDtoModel,
} from '@distributed-chat-system/shared-model';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import { AccountStoreModel } from '@distributed-chat-system/fe-store';

@Component({
  selector: 'lib-create-room-form',
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
  templateUrl: './create-room-form.component.html',
  styleUrl: './create-room-form.component.scss',
})
export class CreateRoomFormComponent implements OnInit, OnDestroy {
  createRoomForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  private socket!: Socket;

  constructor(
    private readonly http: HttpUtils,
    private readonly store: Store<{ account: AccountStoreModel }>
  ) {
    this.createRoomForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  ngOnInit() {
    this.socket = io('localhost:3003', {
      transports: ['websocket'],
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  async onSubmit() {
    const currentAccount = await firstValueFrom(this.store.select('account'));
    const { account } = currentAccount;
    if (!account) return;
    const dto: Omit<RoomDtoModel, 'id'> = {
      name: this.createRoomForm.get('name')?.value,
      password: this.createRoomForm.get('password')?.value,
      ownerId: account.id,
      ownerNick: account.nick,
    };
    await this.http.post<
      Omit<RoomDtoModel, 'id'>,
      ResponseDtoModel<string>,
      void
    >(dto, EndpointEnum.dashboardCreateRoom, (response) => {
      const { data, success } = response;
      if (response.success) {
        this.createRoomForm.reset();
        this.createRoomForm.markAsUntouched();
        this.socket.emit('joinRoomsList');
      }
      this.isSubmited = true;
      this.responseMessage = data;
      this.responseSuccess = success;
    });
  }

  controlInvalid(control: string) {
    return (
      this.createRoomForm.get(control)?.invalid &&
      this.createRoomForm.get(control)?.touched
    );
  }

  controlError(control: string, error: string) {
    return this.createRoomForm.get(control)?.hasError(error);
  }

  formError(error: string) {
    return this.createRoomForm.hasError(error);
  }
}
