import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-form-example></app-form-example>`,
  styles: [
    `
      ::ng-deep body {
        padding: 2rem;
      }
    `,
  ],
})
export class AppComponent {}
