// done
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Properties } from 'csstype';

import { ResponsiveUtils } from '@distributed-chat-system/fe-utils';
import { FlexComponent } from '../flex/flex.component';
import { LogoComponent } from '../logo/logo.component';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';

@Component({
  selector: 'lib-auth-wrapper',
  standalone: true,
  imports: [CommonModule, FlexComponent, LogoComponent, FormWrapperComponent],
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.scss',
})
export class AuthWrapperComponent {
  flexDirection: Properties['flexDirection'];

  constructor(private readonly responsive: ResponsiveUtils) {
    this.responsive.getScreenSize().subscribe((screen) => {
      if (screen === 'xSmall' || screen === 'small') {
        this.flexDirection = 'column';
      } else {
        this.flexDirection = 'row';
      }
    });
  }
}
