// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '@distributed-chat-system/fe-system';
import { FlexComponent } from '@distributed-chat-system/fe-controls';
import {
  ResponseDtoModel,
  SignUpDtoModel,
} from '@distributed-chat-system/shared-model';
import { HttpUtils } from '@distributed-chat-system/fe-utils';
import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@Component({
  selector: 'lib-sign-up-form',
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
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  signUpForm: FormGroup;

  responseMessage: string;

  responseSuccess: boolean;

  isSubmited: boolean;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly http: HttpUtils
  ) {
    this.signUpForm = new FormGroup(
      {
        nick: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      [this.passwordsMatchValidator()]
    );
    this.responseMessage = '';
    this.responseSuccess = false;
    this.isSubmited = false;
  }

  onSubmit() {
    const dto: SignUpDtoModel = {
      nick: this.signUpForm.get('nick')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      rePassword: this.signUpForm.get('rePassword')?.value,
    };
    this.http.post<SignUpDtoModel, ResponseDtoModel<string>>(
      dto,
      EndpointEnum.signUp,
      (response) => {
        const { data, success } = response;
        if (response.success) {
          this.signUpForm.reset();
          this.signUpForm.markAsUntouched();
        }
        this.isSubmited = true;
        this.responseMessage = data;
        this.responseSuccess = success;
      }
    );
  }

  onSignIn() {
    this.router.navigate(['/sign-in']);
  }

  controlInvalid(control: string) {
    return (
      this.signUpForm.get(control)?.invalid &&
      this.signUpForm.get(control)?.touched
    );
  }

  controlError(control: string, error: string) {
    return this.signUpForm.get(control)?.hasError(error);
  }

  formError(error: string) {
    return this.signUpForm.hasError(error);
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const rePassword = group.get('rePassword')?.value;
      if (password !== rePassword) {
        return { passwordsMismatch: true };
      }
      return null;
    };
  }
}
