import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SignInDtoModel } from '@distributed-chat-system/shared-model';

@Component({
  selector: 'lib-sign-in-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  signInForm: FormGroup;

  errorMessage = '';

  constructor(private readonly http: HttpClient) {
    this.signInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    const data: SignInDtoModel = {
      email: 'aaaaa@wp.pl',
      password: '123456',
    };
    this.http
      .post<SignInDtoModel>('http://localhost:3000/sign-in', data)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
