// done
import { Component } from '@angular/core';

import { FormWrapperComponent } from '@distributed-chat-system/fe-controls';
import { SignInFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-sign-in-page',
  standalone: true,
  imports: [SignInFormComponent, FormWrapperComponent],
  templateUrl: './sign-in-page.component.html',
})
export class SignInPageComponent {}
