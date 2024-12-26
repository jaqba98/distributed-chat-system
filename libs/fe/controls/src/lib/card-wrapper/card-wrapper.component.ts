// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-card-wrapper',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss',
})
export class CardWrapperComponent {}
