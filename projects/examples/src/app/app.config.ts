import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DynamicInputComponent, provideFormFactoryConfig } from 'ngx-dynamic-forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFormFactoryConfig({
      aliases: [{ component: DynamicInputComponent, alias: 'input' }],
    }),
  ],
};
