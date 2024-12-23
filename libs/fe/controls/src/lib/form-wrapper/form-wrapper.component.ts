// done
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'lib-form-wrapper',
  standalone: true,
  imports: [CommonModule, CardModule, Panel],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss',
})
export class FormWrapperComponent {
  @Input({ required: true }) header!: string;
}
