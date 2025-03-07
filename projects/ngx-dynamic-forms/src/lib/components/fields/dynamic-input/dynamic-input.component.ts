import { Component } from '@angular/core';
import { CustomFieldComponent } from '../../custom-field/custom-field.component';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorsComponent } from '../../field-errors/field-errors.component';
import { FieldLabelComponent } from '../../field-label/field-label.component';

@Component({
  selector: 'lib-dynamic-input',
  imports: [CommonModule, ReactiveFormsModule, FieldErrorsComponent, FieldLabelComponent],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  template: `
    @if(field()){
    <lib-field-label [field]="field()" />
    <input
      [type]="field().type || 'text'"
      class="ui-p-2 ui-border ui-border-gray-300 ui-rounded-lg ui-w-full ui-text-sm ui-h-10"
      [formControlName]="field().options.formControlName"
      [placeholder]="field().placeholder || ''"
      [ngClass]="{ 'ui-border-red-500': control?.errors, 'ui-opacity-50': field().options?.disabled }"
    />
    <lib-field-errors [errors]="control?.errors" />
    }
  `,
})
export class DynamicInputComponent extends CustomFieldComponent {}
