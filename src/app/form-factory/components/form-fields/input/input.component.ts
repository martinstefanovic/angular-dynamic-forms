import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputComponent {
  /**
   * * General
   * @errors Form control errors
   */
  errors: any = {};
  /**
   * * Inputs
   * @options Configuration for this form field
   * @customFormGroup Used when you want to use this component without form-builder
   */
  @Input() options: any;
  @Input() customFormGroup: any;

  constructor(public controlContainer: ControlContainer) {}

  /* ====================================
  *                HELPERS
  ======================================= */

  onChange(event: Event) {
    const formGroup = this.controlContainer.control as FormGroup;

    if (this.customFormGroup && this.options.fieldFormGroup !== undefined) {
      this.errors =
        this.customFormGroup.controls[this.options.formControlName].errors;
    } else if (
      this.customFormGroup &&
      (this.options.fieldFormGroup || this.options.fieldFormGroup == '')
    ) {
      this.errors = formGroup.controls[this.options.formControlName].errors;
    } else {
      this.errors = formGroup.controls[this.options.formControlName].errors;
    }
  }
}
