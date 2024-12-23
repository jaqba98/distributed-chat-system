// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexComponent } from '../flex/flex.component';

@Component({
  selector: 'lib-logo',
  standalone: true,
  imports: [CommonModule, FlexComponent],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {}
