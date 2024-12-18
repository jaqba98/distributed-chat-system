import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type * as CSS from 'csstype';

@Component({
  selector: 'lib-flex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flex.component.html',
  styleUrl: './flex.component.scss',
})
export class FlexComponent {
  @Input() alignItems: CSS.Properties['alignItems'] = 'flex-start';

  @Input() flexDirection: CSS.Properties['flexDirection'] = 'column';

  @Input() justifyContent: CSS.Properties['justifyContent'] = 'flex-start';

  @Input() gap: CSS.Properties['gap'] = '1rem';

  @Input() minHeight: CSS.Properties['minHeight'];

  getStyles() {
    return {
      alignItems: this.alignItems,
      flexDirection: this.flexDirection,
      justifyContent: this.justifyContent,
      gap: this.gap,
      minHeight: this.minHeight,
    };
  }
}
