// done
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';

import { FlexComponent } from '@distributed-chat-system/fe-controls';
import {
  RoomAccessStoreModel,
  setRoomAccess,
} from '@distributed-chat-system/fe-store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-room-access-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexComponent,
    FloatLabelModule,
    ButtonModule,
    Message,
    InputTextModule,
  ],
  templateUrl: './room-access-form.component.html',
  styleUrl: './room-access-form.component.scss',
})
export class RoomAccessFormComponent implements OnInit, OnDestroy {
  roomAccessForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  private sub!: Subscription;

  private roomName!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<{ roomAccess: RoomAccessStoreModel }>
  ) {
    this.roomAccessForm = new FormGroup({
      password: new FormControl(''),
    });
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const roomName = params.get('roomName');
      if (!roomName) {
        this.router.navigate(['dashboard']);
        return;
      }
      this.roomName = roomName;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async onSubmit() {
    this.store.dispatch(
      setRoomAccess({
        data: {
          roomName: this.roomName,
          password: this.roomAccessForm.get('password')?.value,
        },
      })
    );
    this.router.navigate(['dashboard', 'room', this.roomName]);
  }
}
