import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { RoomsDtoModel } from '@distributed-chat-system/shared-model';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-rooms-page',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
})
export class RoomsPageComponent implements OnInit {
  rooms: RoomsDtoModel = [];

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.http
      .get<RoomsDtoModel>('http://localhost:3002/get-rooms')
      .subscribe((response) => {
        Promise.resolve(response.slice(0, 200)).then((aaa) => {
          this.rooms = aaa;
        });
      });
  }

  join(id: string) {
    this.router.navigate(['dashboard', 'room', id]);
  }
}
