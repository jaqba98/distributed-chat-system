import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { MatButtonModule } from '@angular/material/button';
=======
>>>>>>> parent of 2119f90 (feat: add basic button and input primeng controls)

import {
  ResponseDtoModel,
  SignInDtoModel,
} from '@distributed-chat-system/shared-model';
import { AuthService } from '@distributed-chat-system/fe-system';

@Component({
  selector: 'lib-sign-in-page',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
=======
  imports: [CommonModule, ReactiveFormsModule],
>>>>>>> parent of 2119f90 (feat: add basic button and input primeng controls)
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  signInForm: FormGroup;

  responseMessage!: string;

  responseSuccess!: boolean;

  isSubmited = false;

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
