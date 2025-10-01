import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DynamicInputComponent, provideFormFactoryConfig } from 'ngx-dynamic-forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFormFactoryConfig({
      grid: {
        mainGridClassess: 'ui-grid ui-grid-cols-12 ui-gap-x-4 ui-gap-y-2',
        nestedGridClassess: 'ui-grid ui-grid-cols-12 ui-gap-x-4 ui-gap-y-2',
      },
    }),
  ],
};
