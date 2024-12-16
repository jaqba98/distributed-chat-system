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
import { HttpClient } from '@angular/common/http';

import {
  ResponseDtoModel,
  SignUpDtoModel,
} from '@distributed-chat-system/shared-model';

@Component({
  selector: 'lib-sign-up-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  signUpForm: FormGroup;

  responseMessage!: string;

  responseSuccess!: boolean;

  isSubmited = false;

  constructor(private readonly http: HttpClient) {
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
  }

  onSubmit() {
    this.isSubmited = false;
    if (!this.signUpForm.valid) return;
    const dto: SignUpDtoModel = {
      nick: this.signUpForm.get('nick')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      rePassword: this.signUpForm.get('rePassword')?.value,
    };
    this.http
      .post<ResponseDtoModel>('http://localhost:3000/sign-up', dto)
      .subscribe((response) => {
        const { data, success } = response;
        this.responseMessage = data;
        this.responseSuccess = success;
        this.isSubmited = true;
        if (response.success) {
          this.signUpForm.reset();
          this.signUpForm.markAsUntouched();
        }
      });
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

  passwordsMatchValidator(): ValidatorFn {
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
