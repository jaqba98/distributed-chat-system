// done
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { Properties } from 'csstype';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { io, Socket } from 'socket.io-client';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  AccountBaseModel,
  JoinRoomModel,
  MessageDtoModel,
} from '@distributed-chat-system/shared-model';
import { ResponsiveUtils } from '@distributed-chat-system/fe-utils';
import { AccountStoreModel } from '@distributed-chat-system/fe-store';

@Component({
  selector: 'lib-room-form',
  standalone: true,
  imports: [
    CommonModule,
    MessageModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent implements OnInit, OnDestroy {
  @ViewChild('scrollable') scrollable!: ElementRef;

  messages: MessageDtoModel[] = [];

  messageHaderFlexDirection: Properties['flexDirection'];

  size: 'small' | 'large' = 'large';

  roomForm: FormGroup;

  roomName!: string;

  account!: AccountBaseModel;

  private socket!: Socket;

  private sub!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly responsive: ResponsiveUtils,
    private readonly router: Router,
    private readonly store: Store<{ account: AccountStoreModel }>
  ) {
    this.roomForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  async ngOnInit() {
    this.sub = this.responsive.getScreenSize().subscribe((size) => {
      if (size === 'xSmall') {
        this.messageHaderFlexDirection = 'column';
        this.size = 'small';
      } else {
        this.messageHaderFlexDirection = 'row';
        this.size = 'large';
      }
    });
    const currentAccount = await firstValueFrom(this.store.select('account'));
    const { account } = currentAccount;
    if (!account) return;
    this.account = account;
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['dashboard']);
        return;
      }
      this.roomName = id;
      this.socket = io('localhost:3003', {
        transports: ['websocket'],
      });
      this.socket.on('connect', async () => {
        const currentAccount = await firstValueFrom(
          this.store.select('account')
        );
        const { account } = currentAccount;
        if (!account) return;
        const dto: JoinRoomModel = { accountId: account.id, roomName: id };
        this.socket.emit('joinRoom', dto);
      });
      this.socket.on('disconnect', () => {
        this.socket.emit('disconnectRoom');
      });
      this.socket.on('response', (data: MessageDtoModel) => {
        this.messages.push(data);
        const nativeElement = this.scrollable.nativeElement;
        nativeElement.scrollTop = nativeElement.scrollHeight;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.socket.disconnect();
  }

  async onSubmit() {
    const dto: MessageDtoModel = {
      accountId: this.account.id,
      author: this.account.nick,
      date: new Date().toUTCString(),
      roomName: this.roomName,
      value: this.roomForm.get('message')?.value,
    };
    this.roomForm.markAsUntouched();
    this.roomForm.reset();
    this.socket.emit('message', dto);
  }

  getSeverity(id: number) {
    return this.account.id === id ? 'info' : 'secondary';
  }

  getPosition(id: number) {
    return this.account.id === id ? 'message__right' : 'message__left';
  }
}
