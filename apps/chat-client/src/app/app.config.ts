import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
=======
>>>>>>> parent of 2119f90 (feat: add basic button and input primeng controls)

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(),
<<<<<<< HEAD
    provideAnimationsAsync(), provideAnimationsAsync(),
=======
>>>>>>> parent of 2119f90 (feat: add basic button and input primeng controls)
  ],
};
