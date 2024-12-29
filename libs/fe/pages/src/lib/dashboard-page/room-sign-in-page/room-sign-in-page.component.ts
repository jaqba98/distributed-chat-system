// done
import { Component } from '@angular/core';

import { FormWrapperComponent } from '@distributed-chat-system/fe-controls';
import { RoomSignInFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-room-sign-in-page',
  standalone: true,
  imports: [FormWrapperComponent, RoomSignInFormComponent],
  templateUrl: './room-sign-in-page.component.html',
})
export class RoomSignInPageComponent {}
