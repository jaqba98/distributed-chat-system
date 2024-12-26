// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from '@distributed-chat-system/fe-controls';

@Component({
  selector: 'lib-dashboard-page',
  standalone: true,
  imports: [CommonModule, NavComponent, RouterOutlet],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
