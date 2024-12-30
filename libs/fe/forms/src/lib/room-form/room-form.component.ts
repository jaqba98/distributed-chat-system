import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'lib-room-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent {
  @ViewChild('scrollable') scrollable!: ElementRef;

  roomForm: FormGroup;

  messages: string[] = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, velmollitia. Accusamus modi repellat pariatur illum aut ad autemveritatis natus. Autem commodi, dolorem eveniet porro deleniti dolore?Similique, aut! Lorem ipsum dolor sit amet consectetur adipisicingelit. Deserunt cumque minus, vel facilis ducimus ratione recusandaevoluptatum possimus autem voluptate tempora nam ex temporibusdoloremque, neque, hic delectus voluptatibus aspernatur? Lorem ipsumdolor sit amet consectetur adipisicing elit. Iste totam qui omniseveniet. Iusto saepe accusamus dolor iste at recusandae, voluptatibusrem quam nesciunt magnam, expedita blanditiis? Sapiente, iste autem.',
  ];

  constructor() {
    this.roomForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  onSubmit() {
    this.messages.push(new Date().toDateString());
    const nativeElement = this.scrollable.nativeElement;
    nativeElement.scrollTop = nativeElement.scrollHeight;
    console.log('Hello');
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
