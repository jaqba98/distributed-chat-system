import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { AccountStoreModel } from '@distributed-chat-system/fe-store';
import { JoinRoomModel } from '@distributed-chat-system/shared-model';

@Component({
  selector: 'lib-room-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent implements OnInit, OnDestroy {
  roomForm: FormGroup;

  roomKey!: string;

  private socket!: Socket;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<{ account: AccountStoreModel }>
  ) {
    this.roomForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['dashboard']);
        return;
      }
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
      this.socket.on('response', (data) => {
        console.log(data);
      });
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  onSubmit() {
    const data: { roomKey: string; message: string } = {
      roomKey: this.roomKey,
      message: this.roomForm.get('message')?.value,
    };
    this.socket.emit('message', data);
  }
}
