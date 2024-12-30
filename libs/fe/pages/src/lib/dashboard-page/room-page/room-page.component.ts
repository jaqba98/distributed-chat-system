// done
import { Component } from '@angular/core';

import { RoomFormComponent } from '@distributed-chat-system/fe-forms';

@Component({
  selector: 'lib-room-page',
  standalone: true,
  imports: [RoomFormComponent],
  templateUrl: './room-page.component.html',
})
export class RoomPageComponent {}
