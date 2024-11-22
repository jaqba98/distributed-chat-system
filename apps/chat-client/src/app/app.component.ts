import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { io, Socket } from 'socket.io-client';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-client';

  private socket: Socket;

  message = '';
  response: string | null = null;

  send() {
    this.sendMessage(this.message);
  }

  constructor() {
    // Connect to the load balancer
    this.socket = io('localhost:3000', {
      transports: ['websocket'], // Force WebSocket transport
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

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  onMessage(callback: (response: string) => void) {
    this.socket.on('response', callback);
  }
}
