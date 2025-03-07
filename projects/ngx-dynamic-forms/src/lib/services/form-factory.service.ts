import { Injectable, Signal, WritableSignal, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormFactoryService {
  fb = inject(FormBuilder);

  public createForm(formFields: any[]) {
    const form = this.fb.group({});

    this.flattenFields(form, formFields);
    return form;
  }

  public addSelectOptionsToField({
    fields,
    formControlName,
    options,
  }: {
    fields: WritableSignal<any[]>;
    formControlName: string;
    options: any[];
  }) {
    // Clone the fields array to trigger reactivity when setting the signal
    const updatedFields = fields();

    function updateFields(fields: any[]) {
      for (const field of fields) {
        if ('options' in field && field.options?.formControlName === formControlName) {
          if ('selectOptions' in field) {
            field.selectOptions = [...options]; // Replace or update options
          }
        } else if ('group' in field) {
          updateFields(field.group); // Recursive call for nested groups
        }
      }
    }

    // Perform the update
    updateFields(updatedFields);

    // Update the signal with the new array
    fields.set(updatedFields);
  }

  public patchForm(form: FormGroup, data: any) {
    Object.keys(form.controls).forEach((key) => {
      if (data.hasOwnProperty(key)) {
        form.controls[key].patchValue(data[key]);
      }
    });
  }

  private flattenFields(form: FormGroup, fields: any[]) {
    fields.forEach((field) => {
      if (field.group) {
        this.flattenFields(form, field.group);
      } else {
        if (field.options) {
          form.addControl(field.options.formControlName, this.createField(field));
        }
      }
    });
  }

  private createField(field: any) {
    return new FormControl(
      {
        value: field.options?.value ?? '',
        disabled: field.options?.disabled ?? false,
      },
      field.options?.validators || []
    );
  }
}
