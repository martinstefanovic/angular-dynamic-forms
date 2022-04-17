import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-errors',
  template: `
    <ng-container *ngIf="errors">
      <small *ngIf="errors.maxlength" class="p-error">
        Field has {{ errors.maxlength.actualLength }} characters and must have
        below {{ errors.maxlength.requiredLength }} characters.
      </small>
      <small *ngIf="errors.pattern" class="p-error">
        {{ errors.errorMessage }}
      </small>
      <small *ngIf="errors.required === true" class="p-error">
        This field is required!
      </small>
      <small *ngIf="errors.email === true" class="p-error">
        Please enter a valid email address.
      </small>
    </ng-container>
  `,
})
export class FieldErrorsComponent {
  /**
   * @description
   * Extracted logic for showing form control errors.
   * This component is used inside form builder.
   */

  /**
   * * Inputs
   * @errors Provide all errors from reactive forms
   */
  @Input() errors: any;
}
