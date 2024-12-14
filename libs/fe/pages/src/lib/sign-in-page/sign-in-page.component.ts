import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    console.log(this.signInForm);
    const test = {
      msg: 'sign-in',
    };
    this.http
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .post<any>('http://localhost:3000/sign-in', test)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
