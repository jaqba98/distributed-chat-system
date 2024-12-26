// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { FlexComponent } from '@distributed-chat-system/fe-controls';
import { RoomDtoModel } from '@distributed-chat-system/shared-model';

@Component({
  selector: 'lib-create-room-form',
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
  templateUrl: './create-room-form.component.html',
  styleUrl: './create-room-form.component.scss',
})
export class CreateRoomFormComponent {
  createRoomForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  constructor() {
    this.createRoomForm = new FormGroup({
      roomName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  async onSubmit() {
    const dto: RoomDtoModel = {
      roomName: this.createRoomForm.get('roomName')?.value,
      password: this.createRoomForm.get('password')?.value,
    };
    console.log(dto);
  }

  controlInvalid(control: string) {
    return (
      this.createRoomForm.get(control)?.invalid &&
      this.createRoomForm.get(control)?.touched
    );
  }

  controlError(control: string, error: string) {
    return this.createRoomForm.get(control)?.hasError(error);
  }

  formError(error: string) {
    return this.createRoomForm.hasError(error);
  }
}
