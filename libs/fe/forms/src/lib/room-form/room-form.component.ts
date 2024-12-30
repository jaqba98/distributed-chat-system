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
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MessageDtoModel } from '@distributed-chat-system/shared-model';
import { ResponsiveUtils } from '@distributed-chat-system/fe-utils';

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

  id = 1;

  messages: MessageDtoModel[] = [
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
    {
      author: 'Jan Kowalski',
      accountId: 2,
      date: new Date().toDateString(),
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum ratione rem illo fugit suscipit qui necessitatibus sequi, dolorem sed neque, in nobis accusantium! Illum commodi modi corrupti voluptate neque!',
    },
  ];

  messageHaderFlexDirection: Properties['flexDirection'];

  size: 'small' | 'large' = 'large';

  roomForm: FormGroup;

  private sub!: Subscription;

  constructor(private readonly responsive: ResponsiveUtils) {
    this.roomForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  ngOnInit() {
    this.sub = this.responsive.getScreenSize().subscribe((size) => {
      if (size === 'xSmall') {
        this.messageHaderFlexDirection = 'column';
        this.size = 'small';
      } else {
        this.messageHaderFlexDirection = 'row';
        this.size = 'large';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.messages.push({
      author: 'Jan Kowalski',
      accountId: 1,
      date: new Date().toDateString(),
      value: '123',
    });
    const nativeElement = this.scrollable.nativeElement;
    nativeElement.scrollTop = nativeElement.scrollHeight;
  }

  getSeverity(id: number) {
    return this.id === id ? 'info' : 'secondary';
  }

  getPosition(id: number) {
    return this.id === id ? 'message__right' : 'message__left';
  }
}

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { io, Socket } from 'socket.io-client';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { firstValueFrom } from 'rxjs';
// import { AccountStoreModel } from '@distributed-chat-system/fe-store';
// import { JoinRoomModel } from '@distributed-chat-system/shared-model';
// @Component({
//   selector: 'lib-room-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './room-form.component.html',
//   styleUrl: './room-form.component.scss',
// })
// export class RoomFormComponent implements OnInit, OnDestroy {
//   roomForm: FormGroup;
//   roomKey!: string;
//   private socket!: Socket;
//   constructor(
//     private readonly route: ActivatedRoute,
//     private readonly router: Router,
//     private readonly store: Store<{ account: AccountStoreModel }>
//   ) {
//     this.roomForm = new FormGroup({
//       message: new FormControl(''),
//     });
//   }
//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       const id = params.get('id');
//       if (!id) {
//         this.router.navigate(['dashboard']);
//         return;
//       }
//       this.socket = io('localhost:3003', {
//         transports: ['websocket'],
//       });
//       this.socket.on('connect', async () => {
//         const currentAccount = await firstValueFrom(
//           this.store.select('account')
//         );
//         const { account } = currentAccount;
//         if (!account) return;
//         const dto: JoinRoomModel = { accountId: account.id, roomName: id };
//         this.socket.emit('joinRoom', dto);
//       });
//       this.socket.on('disconnect', () => {
//         this.socket.emit('disconnectRoom');
//       });
//       this.socket.on('response', (data) => {
//         console.log(data);
//       });
//     });
//   }
//   ngOnDestroy() {
//     this.socket.disconnect();
//   }
//   onSubmit() {
//     const data: { roomKey: string; message: string } = {
//       roomKey: this.roomKey,
//       message: this.roomForm.get('message')?.value,
//     };
//     this.socket.emit('message', data);
//   }
// }
