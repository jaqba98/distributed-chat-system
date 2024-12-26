// done
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexComponent } from '../flex/flex.component';
import { LogoComponent } from '../logo/logo.component';
import { CardWrapperComponent } from '../card-wrapper/card-wrapper.component';

@Component({
  selector: 'lib-form-wrapper',
  standalone: true,
  imports: [CommonModule, FlexComponent, LogoComponent, CardWrapperComponent],
  templateUrl: './form-wrapper.component.html',
})
export class FormWrapperComponent {
  @Input() isLogo = false;
}
