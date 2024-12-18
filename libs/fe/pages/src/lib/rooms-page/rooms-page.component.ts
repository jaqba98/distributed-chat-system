import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-rooms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Menubar, RouterLink],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
})
export class RoomsPageComponent implements OnInit {
  roomsForm: FormGroup;

  private socket: Socket;

  items: MenuItem[] = [];

  constructor() {
    this.roomsForm = new FormGroup({
      message: new FormControl(''),
    });
    this.socket = io('localhost:2000', {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      console.log('Connected to server:', this.socket.id);
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    this.socket.on('response', (data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        routerLink: '/logout',
      },
    ];
  }

  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      message: this.roomsForm.get('message')?.value,
    };
    this.socket.emit('message', data);
  }
}
