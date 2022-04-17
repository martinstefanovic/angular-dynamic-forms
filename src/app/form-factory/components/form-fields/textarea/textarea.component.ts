import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TextareaComponent {
  /**
   * * General
   * @errors Form control errors
   */
  errors: any = {};
  /**
   * * Inputs
   * @options Configuration for this form field
   */
  @Input() options: any;

  constructor(public controlContainer: ControlContainer) {}

  /* ====================================
  *                HELPERS
  ======================================= */

  onChange(event: Event) {
    const formGroup = this.controlContainer.control as FormGroup;
    this.errors = formGroup.controls[this.options.formControlName].errors;
  }
}
