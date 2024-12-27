// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndpointEnum } from '@distributed-chat-system/shared-utils';
import { RoomsListComponent } from '@distributed-chat-system/fe-controls';

@Component({
  selector: 'lib-rooms-page',
  standalone: true,
  imports: [CommonModule, RoomsListComponent],
  templateUrl: './rooms-page.component.html',
})
export class RoomsPageComponent {
  endpoint = EndpointEnum.getRooms;
}
