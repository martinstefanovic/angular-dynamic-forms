import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-field-label',
  imports: [],
  template: ` <label class="ui-text-xs ui-text-gray-500 ui-block ui-mb-1 ui-flex ui-flex-row">
    <span class="ui-block">{{ field().label }}</span>
    @if( hasRequiredValidator(field().options.validators)){
    <span class="ui-text-red-500 ui-text-sm ui-inline-block ui-h-1 ui-ml-1">*</span>
    }
  </label>`,
})
export class FieldLabelComponent {
  field = input.required<{
    label: string;
    options: {
      validators: ((control: any) => any)[];
    };
  }>();

  hasRequiredValidator(validators: ((control: any) => any)[]): boolean {
    return validators.some((validator) => {
      if (validator.name === 'required') return true;

      const fnString = validator.toString();
      return fnString.includes('requiredValidator') || fnString.includes('isEmptyInputValue');
    });
  }
}
