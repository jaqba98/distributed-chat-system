// done
import { Component } from '@angular/core';

import { FormWrapperComponent } from '@distributed-chat-system/fe-controls';
import { CreateRoomFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-create-room-page',
  standalone: true,
  imports: [CreateRoomFormComponent, FormWrapperComponent],
  templateUrl: './create-room-page.component.html',
})
export class CreateRoomPageComponent {}
