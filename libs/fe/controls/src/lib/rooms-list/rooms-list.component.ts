// done
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';

import {
  ResponseDtoModel,
  RoomDomainModel,
  RoomDtoModel,
  SocketsDtoModel,
} from '@distributed-chat-system/shared-model';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@Component({
  selector: 'lib-rooms-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
})
export class RoomsListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) endpoint!: EndpointEnum;

  rooms!: RoomDomainModel[];

  private socket!: Socket;

  constructor(
    private readonly http: HttpUtils,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.socket = io('localhost:3003', {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      this.socket.emit('joinRoomsList');
    });
    this.socket.on('getRoomsResponse', async (dto: SocketsDtoModel) => {
      this.rooms = await this.http.get<
        ResponseDtoModel<RoomDtoModel[]>,
        RoomDomainModel[]
      >(this.endpoint, (response) => {
        console.log(dto);
        return response.data.reverse().map((room) => {
          const socket = dto.sockets[room.name];
          return { ...room, counter: socket ? socket.counter : 0 };
        });
      });
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  joinRoom(roomName: string) {
    this.router.navigate(['dashboard', 'room', roomName]);
  }
}
