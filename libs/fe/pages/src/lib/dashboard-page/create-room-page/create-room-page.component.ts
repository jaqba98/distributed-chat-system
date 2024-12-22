import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {
  CreateRoomDtoModel,
  ResponseDtoModel,
} from '@distributed-chat-system/shared-model';
import {
  FlexComponent,
  FormWrapperComponent,
} from '@distributed-chat-system/fe-controls';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-room-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    Message,
    FloatLabelModule,
    FormWrapperComponent,
    FlexComponent,
  ],
  templateUrl: './create-room-page.component.html',
  styleUrl: './create-room-page.component.scss',
})
export class CreateRoomPageComponent {
  createRoomForm: FormGroup;

  responseMessage!: string;

  responseSuccess!: boolean;

  isSubmited = false;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.createRoomForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.isSubmited = false;
    if (!this.createRoomForm.valid) return;
    const dto: CreateRoomDtoModel = {
      name: this.createRoomForm.get('name')?.value,
      password: this.createRoomForm.get('password')?.value,
    };
    this.http
      .post<ResponseDtoModel>('http://localhost:3002/create-room', dto)
      .subscribe((response) => {
        const { data, success } = response;
        this.responseMessage = data;
        this.responseSuccess = success;
        this.isSubmited = true;
        if (response.success) {
          this.createRoomForm.reset();
          this.createRoomForm.markAsUntouched();
        }
      });
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
