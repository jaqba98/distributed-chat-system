import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-room-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.scss',
})
export class RoomPageComponent implements OnInit, OnDestroy {
  roomForm: FormGroup;

  roomKey!: string;

  private socket!: Socket;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
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
      this.socket.on('connect', () => {
        this.roomKey = id;
        this.socket.emit('joinRoom', this.roomKey);
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
