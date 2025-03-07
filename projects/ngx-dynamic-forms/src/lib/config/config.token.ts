import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface FormFactoryConfig {
  aliases: {
    component: any;
    alias: string;
  }[];
  grid: {
    mainGridClassess: string;
    nestedGridClassess: string;
  };
}

const defaultConfig: FormFactoryConfig = {
  aliases: [],
  grid: {
    mainGridClassess: 'ui-grid ui-grid-cols-12 ui-gap-x-4 ui-gap-y-2',
    nestedGridClassess: 'ui-grid ui-grid-cols-12 ui-gap-x-4 ui-gap-y-2',
  },
};

const FormFactoryConfigToken = new InjectionToken<FormFactoryConfig>('FormFactoryConfig');

export function provideFormFactoryConfig(config: Partial<FormFactoryConfig>): ValueProvider {
  return {
    provide: FormFactoryConfigToken,
    useValue: { ...defaultConfig, ...config },
  };
}

export function injectFormFactoryConfig(): FormFactoryConfig {
  return inject(FormFactoryConfigToken, { optional: true }) ?? defaultConfig;
}
