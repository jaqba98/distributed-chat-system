// done
import { Component } from '@angular/core';

import { FormWrapperComponent } from '@distributed-chat-system/fe-controls';
import { RoomAccessFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-room-access-page',
  standalone: true,
  imports: [RoomAccessFormComponent, FormWrapperComponent],
  templateUrl: './room-access-page.component.html',
})
export class RoomAccessPageComponent {}
