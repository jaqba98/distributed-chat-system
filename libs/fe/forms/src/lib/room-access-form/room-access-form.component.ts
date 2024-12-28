// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { FlexComponent } from '@distributed-chat-system/fe-controls';

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
export class RoomAccessFormComponent {
  roomAccessForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  constructor() {
    this.roomAccessForm = new FormGroup({
      password: new FormControl(''),
    });
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  async onSubmit() {
    const dto = {
      password: this.roomAccessForm.get('password')?.value,
    };
    console.log(dto);
  }
}
 