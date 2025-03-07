import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'lib-custom-field',
  imports: [CommonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  template: ``,
})
export class CustomFieldComponent {
  field = input<any>();
  public parentContainer = inject(ControlContainer);

  get control(): AbstractControl | null {
    return (this.parentContainer.control as FormGroup).get(this.field()?.options?.formControlName) || null;
  }

  updateValue(value: string | number) {
    (this.parentContainer.control as FormGroup).get(this.field().options.formControlName)?.setValue(value);
  }
}
