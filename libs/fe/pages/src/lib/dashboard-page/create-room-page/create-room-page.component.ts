// done
import { Component } from '@angular/core';

import { FormWrapperComponent } from '@distributed-chat-system/fe-controls';
import { SignInFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-create-room-page',
  standalone: true,
  imports: [SignInFormComponent, FormWrapperComponent],
  templateUrl: './create-room-page.component.html',
})
export class CreateRoomPageComponent {}
