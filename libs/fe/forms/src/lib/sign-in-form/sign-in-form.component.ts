// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '@distributed-chat-system/fe-system';
import { FlexComponent } from '@distributed-chat-system/fe-controls';
import {
  ResponseDtoModel,
  SignInDtoModel,
} from '@distributed-chat-system/shared-model';
import { EndpointEnum, HttpUtils } from '@distributed-chat-system/fe-utils';

@Component({
  selector: 'lib-sign-in-form',
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
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  signInForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly http: HttpUtils
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  onSubmit() {
    const dto: SignInDtoModel = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value,
    };
    this.http.post<SignInDtoModel, ResponseDtoModel<string>>(
      dto,
      EndpointEnum.signIn,
      (response) => {
        this.signInForm.reset();
        this.signInForm.markAsUntouched();
        if (response.success) {
          this.auth.saveToken(response.data);
          this.router.navigate(['/dashboard']);
          return;
        }
        const { data, success } = response as ResponseDtoModel<string>;
        this.isSubmited = true;
        this.responseMessage = data;
        this.responseSuccess = success;
      }
    );
  }

  onSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
