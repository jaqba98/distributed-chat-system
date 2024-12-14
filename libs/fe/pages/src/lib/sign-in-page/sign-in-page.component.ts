import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {
  ResponseDtoModel,
  SignInDtoModel,
} from '@distributed-chat-system/shared-model';

@Component({
  selector: 'lib-sign-in-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  signInForm: FormGroup;

  response!: ResponseDtoModel;

  constructor(private readonly http: HttpClient) {
    this.signInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    const data: SignInDtoModel = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value,
    };
    this.http
      .post<ResponseDtoModel>('http://localhost:3000/sign-in', data)
      .subscribe((data) => {
        this.response = data;
        this.signInForm.reset();
        this.signInForm.markAsUntouched();
      });
  }
}
