import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class DropdownComponent {
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
  /**
   * * Outputs
   * @handleChange Event when item in dropdown is selected
   */
  @Output() handleChange = new EventEmitter<any>();

  constructor(public controlContainer: ControlContainer) {}

  /* ====================================
  *                HELPERS
  ======================================= */

  onChangeValue(value: any) {
    this.handleChange.emit(value);
  }
}
