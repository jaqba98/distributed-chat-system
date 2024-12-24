// done
import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResponsiveUtils {
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  getScreenSize(): Observable<
    'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'
  > {
    return this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((state: BreakpointState) => {
          if (state.breakpoints[Breakpoints.XSmall]) {
            // console.log('xSmall', Breakpoints.XSmall);
            return 'xSmall';
          }
          if (state.breakpoints[Breakpoints.Small]) {
            // console.log('small', Breakpoints.Small);
            return 'small';
          }
          if (state.breakpoints[Breakpoints.Medium]) {
            // console.log('medium', Breakpoints.Medium);
            return 'medium';
          }
          if (state.breakpoints[Breakpoints.Large]) {
            // console.log('large', Breakpoints.Large);
            return 'large';
          }
          if (state.breakpoints[Breakpoints.XLarge]) {
            // console.log('xLarge', Breakpoints.XLarge);
            return 'xLarge';
          }
          throw new Error('Not supported breakpoint type!');
        })
      );
  }
}
