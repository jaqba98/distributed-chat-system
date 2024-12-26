// done
import { Component } from '@angular/core';

import { FormWrapperComponent } from '@distributed-chat-system/fe-controls';
import { SignUpFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-sign-up-page',
  standalone: true,
  imports: [SignUpFormComponent, FormWrapperComponent],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {}
