// done
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import {
  ResponseDtoModel,
  RoomDtoModel,
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
export class RoomsListComponent implements OnInit {
  @Input({ required: true }) endpoint!: EndpointEnum;

  rooms!: RoomDtoModel[];

  constructor(private readonly http: HttpUtils) {}

  async ngOnInit() {
    this.rooms = await this.http.get<
      ResponseDtoModel<RoomDtoModel[]>,
      RoomDtoModel[]
    >(this.endpoint, (response) => {
      return response.data.reverse();
    });
  }
}
