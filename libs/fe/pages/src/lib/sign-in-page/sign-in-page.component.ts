import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';

import {
  ResponseDtoModel,
  SignInDtoModel,
} from '@distributed-chat-system/shared-model';
import { AuthService } from '@distributed-chat-system/fe-system';
import { LogoComponent } from '@distributed-chat-system/fe-controls';

@Component({
  selector: 'lib-sign-in-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    Message,
    FloatLabelModule,
    LogoComponent,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  signInForm: FormGroup;

  responseMessage!: string;

  responseSuccess!: boolean;

  isSubmited = false;

  value1: string | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService,
    private router: Router
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    const dto: SignInDtoModel = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value,
    };
    this.http
      .post<ResponseDtoModel>('http://localhost:3000/sign-in', dto)
      .subscribe((response) => {
        this.signInForm.reset();
        this.signInForm.markAsUntouched();
        const { data, success } = response;
        if (success) {
          this.auth.saveToken(data);
          this.router.navigate(['/rooms']);
          return;
        }
        this.isSubmited = true;
        this.responseMessage = data;
        this.responseSuccess = success;
      });
  }
}
