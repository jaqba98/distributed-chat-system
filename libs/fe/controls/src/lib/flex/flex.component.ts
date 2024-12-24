// done
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Properties } from 'csstype';

@Component({
  selector: 'lib-flex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flex.component.html',
  styleUrl: './flex.component.scss',
})
export class FlexComponent {
  @Input() alignItems: Properties['alignItems'] = 'flex-start';

  @Input() flexDirection: Properties['flexDirection'] = 'column';

  @Input() justifyContent: Properties['justifyContent'] = 'flex-start';

  @Input() gap: Properties['gap'];

  @Input() minHeight: Properties['minHeight'];

  @Input() padding: Properties['padding'];

  getStyles() {
    return {
      alignItems: this.alignItems,
      flexDirection: this.flexDirection,
      justifyContent: this.justifyContent,
      gap: this.gap,
      minHeight: this.minHeight,
      padding: this.padding,
    };
  }
}
